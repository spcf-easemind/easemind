import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authSubscribe, initSatellite } from '@junobuild/core';
import {
  signIn,
  signOut,
  listDocs,
  setDoc,
  getDoc,
  deleteDoc,
} from '@junobuild/core';

export const useAuthenticationStore = create(
  persist(
    (set, get) => ({
      user: {
        identity_provider: null,
        data: null,
      },
      message: null,
      loading: false,

      initializeJuno: async () => {
        await initSatellite();
        // console.log("Juno initialized:", response);
      },

      authenticateInternetIdentity: async () => {
        // Set Loading True
        set(() => ({ loading: true }));

        // Authenticate Internet Identity
        const signInOptions = {
          windowed: true,
          maxTimeToLive: BigInt(4 * 60 * 60 * 1000 * 1000 * 1000),
          allowPin: false,
        };

        const handleSignIn = async () => {
          await signIn(signInOptions).catch((error) => {
            console.error('Sign-in failed:', error);
          });
        };

        await handleSignIn();

        const sub = authSubscribe((userJuno) =>
          set((state) => {
            return {
              user: {
                ...state.user,
                identity_provider: {
                  identity: userJuno.identity,
                  owner: userJuno.owner,
                  key: userJuno.key,
                },
              },
            };
          })
        );

        // Set Loading False
        set(() => ({ loading: false }));

        return () => sub();
      },

      logoutInternetIdentity: async (userKey) => {
        set(() => ({
          message: 'Loading',
          loading: true,
        }));
        const userCredential = await getDoc({
          collection: 'userCredentials',
          key: userKey,
        });

        const user = await getDoc({
          collection: 'users',
          key: userKey,
        });

        if (userCredential && user) {
          const userWithConvertedDates = convertTimestamps(user);
          const userData = user.data;
          const userKey = user.key;
          const userVersion = user.version;

          const updatedUserData = {
            key: userKey,
            fullName: userData.fullName,
            status: 'offline',
            lastUpdated: userWithConvertedDates,
          };

          await setDoc({
            collection: 'users',
            doc: {
              key: userKey,
              data: updatedUserData,
              version: userVersion,
            },
          });

          const response = await signOut();

          console.log(response);

          set(() => ({
            user: {
              identity_provider: null,
              data: null,
            },
            message: null,
            loading: false,
          }));
          // sessionStorage.removeItem('authentication');
          return true;
        } else {
          set(() => ({
            user: null,
            message: 'No account found on this identity. Please sign up first',
            loading: false,
          }));
          return false;
        }
      },

      loginUser: async (email, password) => {
        // Set Loading True
        set(() => ({ loading: true }));

        const items = await listDocs({
          collection: 'userCredentials',
        });

        if (items.items && items.items.length > 0 && items.items[0].data) {
          // console.log('asd', email);
          if (
            items.items[0].data.email === email &&
            items.items[0].data.password === password
          ) {
            const user = await getDoc({
              collection: 'users',
              key: items.items[0].key,
            });

            const userWithConvertedDates = convertTimestamps(user);
            const userData = user.data;
            const userKey = user.key;
            const userVersion = user.version;
            const userItems = items.items[0].data;

            // use the formData when you needed to update the userCredentials.
            const updatedData = {
              key: userData.key,
              fullName: userData.fullName,
              status: 'online',
              role: userData.role,
              lastUpdated: userWithConvertedDates,
            };

            await setDoc({
              collection: 'users',
              doc: {
                key: userKey,
                data: updatedData,
                version: userVersion,
              },
            });

            set((state) => ({
              user: {
                ...state.user,
                data: {
                  fullName: userData.fullName,
                  email: userItems.email,
                  key: userKey,
                  role: userItems.role,
                },
              },
              message: 'Login Successfully!',
            }));

            // Set Loading False
            set(() => ({ loading: false }));
          } else {
            set((state) => ({
              user: {
                ...state.user,
                data: null,
              },
              message: 'Incorrect email or password',
            }));

            // Set Loading False
            set(() => ({ loading: false }));
          }
        } else {
          set((state) => ({
            user: {
              ...state.user,
              data: null,
            },
            message: 'No account found on this identity. Please sign up first',
          }));

          // Set Loading False
          set(() => ({ loading: false }));
        }
      },
    }),
    {
      name: 'authentication',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);

function convertTimestamps(user) {
  const convertNanosToDateString = (nanos) => {
    // Convert nanoseconds to milliseconds
    const milliseconds = Number(nanos.toString().slice(0, -6));
    const date = new Date(milliseconds);

    // Format the date as a string (e.g., "2024-03-14 15:30:45")
    return date;
  };

  // Use updated_at if it exists, otherwise fallback to created_at
  const timestamp = user.updated_at || user.created_at;

  if (timestamp) {
    return convertNanosToDateString(timestamp);
  }

  // Return null or a default string if no valid timestamp is found
  return null; // or return "N/A" if you prefer a default string
}

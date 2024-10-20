import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authSubscribe, initSatellite } from "@junobuild/core";
import {
  signIn,
  signOut,
  listDocs,
  setDoc,
  getDoc,
  deleteDoc,
} from "@junobuild/core";

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
            console.error("Sign-in failed:", error);
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
          user: {
            identity_provider: null,
            data: null,
          },
          message: null,
          loading: false,
        }));

        const userCredential = await getDoc({
          collection: "userCredentials",
          key: userKey,
        });

        const user = await getDoc({
          collection: "users",
          key: userKey,
        });

        if (userCredential && user) {
          user.data.status = "offline";
          userCredential.data.status = "offline";

          await setDoc({
            collection: "users",
            doc: {
              key: user.key,
              data: user.data,
              version: user.version,
            },
          });

          await setDoc({
            collection: "userCredentials",
            doc: {
              key: userCredential.key,
              data: userCredential.data,
              version: userCredential.version,
            },
          });

          await signOut();

          // sessionStorage.removeItem('authentication');

          set(() => ({
            user: {
              identity_provider: null,
              data: null,
            },
            message: "Logout Successfully!",
            loading: false,
          }));
          return true;
        } else {
          set(() => ({
            user: {
              identity_provider: null,
              data: null,
            },
            message: "No Identity found on this account!",
            loading: false,
          }));
          return false;
        }
      },

      loginUser: async (email, password) => {
        // Set Loading True
        set(() => ({ loading: true }));

        const items = await listDocs({
          collection: "userCredentials",
        });

        const placeholderProfileImage = await listDocs({
          collection: "userPlaceholderImages",
        });

        if (items.items && items.items.length > 0 && items.items[0].data) {
          // console.log('asd', email);
          if (
            items.items[0].data.email === email &&
            items.items[0].data.password === password
          ) {
            const user = await getDoc({
              collection: "users",
              key: items.items[0].key,
            });

            let profileImageUrl = "";
            if (placeholderProfileImage.items[0].data) {
              profileImageUrl =
                placeholderProfileImage.items[0].data
                  .placeholderProfileImagePath;
            }

            // use the formData when you needed to update the userCredentials.
            user.data.status = "online";

            items.items[0].data.lastUpdated = convertTimestamps(items.items[0]);

            await setDoc({
              collection: "users",
              doc: {
                key: user.key,
                data: user.data,
                version: user.version,
              },
            });

            await setDoc({
              collection: "userCredentials",
              doc: {
                key: items.items[0].key,
                data: items.items[0].data,
                version: items.items[0].version,
              },
            });

            set((state) => ({
              user: {
                ...state.user,
                data: {
                  fullName: user.data.fullName,
                  email: items.items[0].data.email,
                  key: user.key,
                  role: user.data.role,
                  profileImageUrl: profileImageUrl,
                },
              },
              message: "Login Successfully!",
            }));

            // Set Loading False
            return true;
          } else {
            set((state) => ({
              user: {
                ...state.user,
                data: null,
              },
              message: "Incorrect email or password",
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
            message: "No account found on this identity. Please sign up first",
          }));

          // Set Loading False
          set(() => ({ loading: false }));
        }
      },
    }),
    {
      name: "authentication",
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

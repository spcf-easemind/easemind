import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authSubscribe, initSatellite } from "@junobuild/core";
import { signIn, signOut, listDocs, setDoc, getDoc } from "@junobuild/core";

export const useAuthenticationStore = create(
  persist(
    (set, get) => ({
      user: null,
      message: null,

      initializeJuno: async () => {
        await initSatellite();
        // console.log("Juno initialized:", response);
      },

      authenticateInternetIdentity: async () => {
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
          set(() => {
            console.log(userJuno);

            return {
              user: {
                [userJuno.data.provider]: {
                  identity: userJuno.identity,
                  owner: userJuno.owner,
                  key: userJuno.key,
                },
              },
            };
          })
        );

        return () => sub();
      },

      logoutInternetIdentity: async () => {
        const items = await listDocs({
          collection: "userCredentials",
        });

        if (items.items && items.items.length > 0 && items.items[0].data) {
          // console.log('asd', email);
          const userData = items.items[0].data;
          const userKey = items.items[0].key;
          const userVersion = items.items[0].version;

          // use the formData when you needed to update the userCredentials.
          const updatedData = {
            dateOfBirth: userData.dateOfBirth,
            email: userData.email,
            fullName: userData.fullName,
            mobileNumber: userData.mobileNumber,
            password: userData.password,
            role: userData.role,
          };

          const user = await getDoc({
            collection: "users",
            key: userKey,
          });

          const updatedUserData = {
            key: user.data.key,
            fullName: user.data.fullName,
            status: "offline",
          };
          set(() => ({
            user: null,
            message: "Loading...",
          }));

          await setDoc({
            collection: "userCredentials",
            doc: {
              key: userKey,
              data: updatedData,
              version: userVersion,
            },
          });

          await setDoc({
            collection: "users",
            doc: {
              key: user.key,
              data: updatedUserData,
              version: user.version,
            },
          });

          const response = await signOut();

          console.log(response);

          sessionStorage.removeItem("authentication");

          set(() => ({
            user: null,
            message: "Logout Successfully!",
          }));
        } else {
          set(() => ({
            user: null,
            message: "No account found on this identity. Please sign up first",
          }));
        }
      },

      loginUser: async (email, password) => {
        const items = await listDocs({
          collection: "userCredentials",
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

            const userData = user.data;
            const userKey = user.key;
            const userVersion = user.version;

            // use the formData when you needed to update the userCredentials.
            const updatedData = {
              key: userData.key,
              fullName: userData.fullName,
              status: "online",
            };

            await setDoc({
              collection: "users",
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
                  fullName: items.items[0].data.fullName,
                  email: items.items[0].data.email,
                },
              },
              message: "Login Successfully!",
            }));
          } else {
            set((state) => ({
              user: {
                ...state.user,
                data: null,
              },
              message: "Incorrect email or password",
            }));
          }
        } else {
          set((state) => ({
            user: {
              ...state.user,
              data: null,
            },
            message: "No account found on this identity. Please sign up first",
          }));
        }
      },
    }),
    {
      name: "authentication",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

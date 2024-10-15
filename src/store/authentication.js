import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authSubscribe, initSatellite } from "@junobuild/core";
import { signIn, signOut } from "@junobuild/core";

export const useAuthenticationStore = create(
  persist(
    (set, get) => ({
      user: null,

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

      logoutInternetIdentity: () => {
        set(() => ({ user: null }));
        signOut();
      },
    }),
    {
      name: "authentication",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

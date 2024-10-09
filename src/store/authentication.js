import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authSubscribe } from "@junobuild/core";
import { signIn, signOut } from "@junobuild/core";

export const useAuthenticationStore = create(
  persist(
    (set, get) => ({
      user: null,

      authenticateInternetIdentity: () => {
        // Authenticate Internet Identity
        const signInOptions = {
          windowed: true,
          maxTimeToLive: BigInt(4 * 60 * 60 * 1000 * 1000 * 1000),
          allowPin: false,
        };

        const handleSignIn = () => {
          signIn(signInOptions).catch((error) => {
            console.error("Sign-in failed:", error);
          });
        };

        handleSignIn();

        const sub = authSubscribe((userJuno) =>
          set(() => ({ user: userJuno }))
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

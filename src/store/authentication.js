import { create } from 'zustand';
import { authSubscribe } from '@junobuild/core';
import { signIn, signOut } from '@junobuild/core';

export const useAuthenticationStore = create((set) => ({
  user: null,
  authResponse: {},

  // Functions
  authenticateInternetIdentity: () => {
    const signInOptions = {
      windowed: true,
      maxTimeToLive: BigInt(4 * 60 * 60 * 1000 * 1000 * 1000),
      allowPin: false,
    };

    const handleSignIn = () => {
      signIn(signInOptions).catch((error) => {
        console.error('Sign-in failed:', error);
      });
    };

    handleSignIn();

    console.log('Test');

    const sub = authSubscribe((userJuno) => set(() => ({ user: userJuno })));

    return () => sub();
  },
  logoutInternetIdentity: () => {
    console.log("test")
    signOut();
  },
}));

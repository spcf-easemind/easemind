import { create } from "zustand";

export const useDialogStore = create((set) => ({
  dialog: {
    desktop: true,
    mobile: false,
  },
  aside: {
    desktop: true,
    mobile: false,
  },

  toggleDialog: () => set((state) => ({ dialog: !state.dialog })),

  // Set Aside Desktop
  toggleAsideDesktop: () =>
    set((state) => ({
      aside: { ...state.aside, desktop: !state.aside.desktop },
    })),
  setAsideDesktop: (val) => set(() => ({ aside: val })),

  // Set Aside Mobile
  toggleAsideMobile: () =>
    set((state) => ({
      aside: { ...state.aside, mobile: !state.aside.mobile },
    })),
  setAsideMobile: (val) => set(() => ({ aside: val })),
}));

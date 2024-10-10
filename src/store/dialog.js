import { create } from "zustand";

export const useDialogStore = create((set) => ({
  dialog: false,

  drawer: {
    desktop: true,
    mobile: false,
  },

  aside: {
    desktop: true,
    mobile: false,
  },

  toggleDialog: () => set((state) => ({ dialog: !state.dialog })),

  // Set Drawer Desktop
  toggleDrawerDesktop: () =>
    set((state) => ({
      drawer: { ...state.drawer, desktop: !state.drawer.desktop },
    })),

  // Set Drawer Mobile
  toggleDrawerMobile: () =>
    set((state) => ({
      drawer: { ...state.drawer, mobile: !state.drawer.mobile },
    })),

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

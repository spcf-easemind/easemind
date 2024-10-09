import { create } from "zustand";

export const useDialogStore = create((set) => ({
  dialog: false,

  toggleDialog: () => set((state) => ({ dialog: !state.dialog })),
}));

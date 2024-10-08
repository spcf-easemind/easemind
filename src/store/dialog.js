import { create } from 'zustand'

const useDialogStore = create((set) => ({
  dialog: false,

  increasePopulation: () => set((state) => ({ })),
  removeAllBears: () => set({ bears: 0 }),
}))
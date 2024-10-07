import { create } from 'zustand'

const useDialogStore = create((set) => ({
  dialog: false,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
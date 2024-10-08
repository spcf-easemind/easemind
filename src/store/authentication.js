import { create } from 'zustand'

const useAuthenticationStore = create((set) => ({
  authResponse: {
    
  },

  // Functions
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
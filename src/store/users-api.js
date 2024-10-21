import { create } from "zustand";
import { useUsersStore } from "./users";

export const useUsersAPIStore = create((set) => ({
  userCompanions: [],
  userCompanion: null,

  fetchUserCompanions: async () => {
    const fetchUserCompanionsFn =
      useUsersStore.getState().getAllUserActiveCompanions;
    const response = await fetchUserCompanionsFn();

    if (response) {
      const companionsData = useUsersStore.getState().data;
      set(() => ({
        userCompanions: companionsData,
      }));
    }
  },

  fetchUserCompanion: async (companionKey) => {
    const fetchUserCompanionFn =
      useUsersStore.getState().getUserActiveCompanion;
    const response = await fetchUserCompanionFn(companionKey);

    if (response) {
      const companionData = useUsersStore.getState().data;
      set(() => ({
        userCompanion: companionData,
      }));
    }
  },
}));

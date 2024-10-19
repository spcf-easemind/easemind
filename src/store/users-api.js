import { create } from "zustand";
import { useUsersStore } from "./users";

export const useUsersAPIStore = create((set) => ({
  userCompanions: [],

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
}));

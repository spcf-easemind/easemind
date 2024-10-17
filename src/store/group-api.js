import { create } from "zustand";
import { useGroupStore } from "./group";
export const useGroupAPIStore = create((set) => ({
  ownedGroups: [],
  ownedGroup: null,

  fetchOwnedGroups: async (loggedInUserId) => {
    const fetchAllGroupsFn = useGroupStore.getState().getAllGroups;
    const response = await fetchAllGroupsFn();

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const filteredOwnedGroups = groupData.filter(
        ({ owner }) => owner.key === loggedInUserId
      );
      set(() => ({
        ownedGroups: filteredOwnedGroups,
      }));
    }
  },
  fetchOwnedGroup: async (ownedGroupRef) => {
    const fetchAllGroupsFn = useGroupStore.getState().getAllGroups;
    const response = await fetchAllGroupsFn();

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const ownedGroup = groupData.find(({ key }) => key === ownedGroupRef);

      set(() => ({
        ownedGroup: ownedGroup,
      }));
    }
  },
}));

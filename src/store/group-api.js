import { create } from "zustand";
import { useGroupStore } from "./group";
export const useGroupAPIStore = create((set) => ({
  ownedGroups: [],
  ownedGroup: null,

  communityGroups: [],

  joinedGroups: [],

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
  fetchCommunityGroups: async (loggedInUserId) => {
    const fetchAllGroupsFn = useGroupStore.getState().getAllGroups;
    const response = await fetchAllGroupsFn();

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const filteredCommunityGroups = groupData.filter(
        ({ members }) =>
          !members.some((member) => member.key === loggedInUserId)
      );
      set(() => ({
        communityGroups: filteredCommunityGroups,
      }));
    }
  },
  fetchJoinedGroups: async (loggedInUserId) => {
    const fetchAllGroupsFn = useGroupStore.getState().getAllGroups;
    const response = await fetchAllGroupsFn();

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const filteredJoinedGroups = groupData.filter(({ members }) =>
        members.some(
          (member) =>
            member.key === loggedInUserId && member.groupRole === "Group Member"
        )
      );
      set(() => ({
        joinedGroups: filteredJoinedGroups,
      }));
    }
  },
}));

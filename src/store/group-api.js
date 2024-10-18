import { create } from "zustand";
import { useGroupStore } from "./group";
export const useGroupAPIStore = create((set, get) => ({
  loading: false,

  ownedGroups: [],
  ownedGroup: null,

  communityGroups: [],

  joinedGroups: [],
  joinedGroup: null,

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
  removeGroupMember: async (ownedGroupRef, loggedInUserId) => {
    set(() => ({
      loading: true,
    }));
    const formData = { groupKey: ownedGroupRef, userKey: loggedInUserId };

    console.log(formData);
    const removeMemberFn = useGroupStore.getState().removeMember;
    const response = await removeMemberFn(formData);

    if (response) {
      const fetchOwnedGroupFn = get().fetchOwnedGroup;
      await fetchOwnedGroupFn(ownedGroupRef);
    }

    set(() => ({
      loading: false,
    }));
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

      console.log(filteredJoinedGroups);
      set(() => ({
        joinedGroups: filteredJoinedGroups,
      }));
    }
  },
  fetchJoinedGroup: async (joinedGroupRef) => {
    const fetchAllGroupsFn = useGroupStore.getState().getAllGroups;
    const response = await fetchAllGroupsFn();

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const joinedGroup = groupData.find(({ key }) => key === joinedGroupRef);

      console.log(joinedGroup)

      set(() => ({
        joinedGroup: joinedGroup,
      }));
    }
  },
  createGroup: async (formData) => {
    const createGroupFn = useGroupStore.getState().createGroup;

    // Create group
    await createGroupFn(formData);

    // Notifications
    const fetchGroupMessage = useGroupStore.getState().groupMessage;
    return fetchGroupMessage;
  },
}));

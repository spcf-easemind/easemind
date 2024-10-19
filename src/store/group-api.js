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
    const formData = { userKey: loggedInUserId };
    const fetchOwnedGroupsFn =
      useGroupStore.getState().userGroupPendingApproval;
    const response = await fetchOwnedGroupsFn(formData);

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const mappedOwnedGroup = groupData.map(({ groupInfo }) => groupInfo);
      set(() => ({
        ownedGroups: mappedOwnedGroup,
      }));
    }
  },
  fetchOwnedGroup: async (loggedInUserId, ownedGroupRef) => {
    const formData = { userKey: loggedInUserId };
    const fetchOwnedGroupsFn =
      useGroupStore.getState().userGroupPendingApproval;
    const response = await fetchOwnedGroupsFn(formData);

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const ownedGroup = groupData.find(
        ({ groupInfo }) => groupInfo.key === ownedGroupRef
      );

      set(() => ({
        ownedGroup: ownedGroup,
      }));
    }
  },
  removeGroupMember: async (loggedInUserId, ownedGroupRef, userKey) => {
    set(() => ({
      loading: true,
    }));
    const formData = { groupKey: ownedGroupRef, userKey: userKey };
    const removeMemberFn = useGroupStore.getState().removeMember;

    try {
      await removeMemberFn(formData);
      await get().fetchOwnedGroup(loggedInUserId, ownedGroupRef);

      set(() => ({
        loading: false,
      }));
      const fetchGroupMessage = useGroupStore.getState().groupMessage;

      return { type: "success", message: fetchGroupMessage };
    } catch (error) {
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "error", message: fetchGroupMessage };
    }
  },

  // Community Groups
  fetchCommunityGroups: async (loggedInUserId) => {
    const formData = { userKey: loggedInUserId };
    const fetchCommunityGroupsFn =
      useGroupStore.getState().getAllAvailableGroups;
    const response = await fetchCommunityGroupsFn(formData);

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      set(() => ({
        communityGroups: groupData,
      }));
    }
  },

  // Joined Groups
  fetchJoinedGroups: async (loggedInUserId) => {
    const formData = { userKey: loggedInUserId };
    const fetchJoinedGroupsFn = useGroupStore.getState().getUserGroup;
    const response = await fetchJoinedGroupsFn(formData);

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const mappedJoinedGroups = groupData.map(({ data }) => data);
      set(() => ({
        joinedGroups: mappedJoinedGroups,
      }));
    }
  },
  fetchJoinedGroup: async (joinedGroupRef) => {
    const fetchAllGroupsFn = useGroupStore.getState().getAllGroups;
    const response = await fetchAllGroupsFn();

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      const joinedGroup = groupData.find(({ key }) => key === joinedGroupRef);
      set(() => ({
        joinedGroup: joinedGroup,
      }));
    }
  },
  createGroup: async (formData) => {
    const createGroupFn = useGroupStore.getState().createGroup;

    try {
      // Create group
      await createGroupFn(formData);
      // Set Notifications
      const groupKey = useGroupStore.getState().groupData;
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "success", message: fetchGroupMessage, key: groupKey };
    } catch (error) {
      // Notifications
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "error", message: fetchGroupMessage };
    }
  },
  updateGroup: async (formData) => {
    const updateGroupFn = useGroupStore.getState().editGroupInfo;

    try {
      // Update Group
      await updateGroupFn(formData);

      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "success", message: fetchGroupMessage };
    } catch (error) {
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "error", message: fetchGroupMessage };
    }
  },
}));

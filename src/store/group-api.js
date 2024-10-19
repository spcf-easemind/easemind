import { create } from "zustand";
import { useGroupStore } from "./group";
export const useGroupAPIStore = create((set, get) => ({
  loading: false,

  ownedGroups: [],
  ownedGroup: null,

  communityGroups: [],
  communityGroup: null,

  joinedGroups: [],
  joinedGroup: null,

  // Owned Groups
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
  fetchCommunityGroup: async (communityRef) => {
    const formData = { groupKey: communityRef };
    const fetchCommunityGroupFn = useGroupStore.getState().getGroup;
    const response = await fetchCommunityGroupFn(formData);

    if (response) {
      const groupData = useGroupStore.getState().groupData;
      set(() => ({
        communityGroup: groupData,
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
    const response = await createGroupFn(formData);

    if (response) {
      const groupKey = useGroupStore.getState().groupData;
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "success", message: fetchGroupMessage, key: groupKey };
    } else {
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "error", message: fetchGroupMessage };
    }
  },
  updateGroup: async (formData) => {
    const updateGroupFn = useGroupStore.getState().editGroupInfo;
    const response = await updateGroupFn(formData);

    if (response) {
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "success", message: fetchGroupMessage };
    } else {
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "error", message: fetchGroupMessage };
    }
  },

  removeGroupMember: async (loggedInUserId, ownedGroupRef, userKey) => {
    set(() => ({
      loading: true,
    }));
    const formData = { groupKey: ownedGroupRef, userKey: userKey };
    const removeMemberFn = useGroupStore.getState().removeMember;
    const response = await removeMemberFn(formData);

    if (response) {
      set(() => ({
        loading: false,
      }));
      await get().fetchOwnedGroup(loggedInUserId, ownedGroupRef);
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "success", message: fetchGroupMessage };
    } else {
      set(() => ({
        loading: false,
      }));
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "error", message: fetchGroupMessage };
    }
  },
  joinGroup: async (loggedInUserId, groupKey) => {
    set(() => ({
      loading: true,
    }));
    const formData = { userKey: loggedInUserId, groupKey: groupKey };
    const joinGroupFn = useGroupStore.getState().joinUserGroup;
    const response = await joinGroupFn(formData);

    if (response) {
      set(() => ({
        loading: false,
      }));
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "success", message: fetchGroupMessage, key: groupKey };
    } else {
      set(() => ({
        loading: false,
      }));
      const fetchGroupMessage = useGroupStore.getState().groupMessage;
      return { type: "error", message: fetchGroupMessage, key: groupKey };
    }
  },
}));

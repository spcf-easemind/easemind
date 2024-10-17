import { create } from "zustand";
import { usePublicMaterials } from "./miscellaneous";
import { useUsersStore } from "./users";
import { useGroupStore } from "./group";

export const useEnumsStore = create((set) => ({
  interests: {
    thoughts: [],
    emotions: [],
    members: [],
  },

  groupImages: [],

  users: [],

  //interest[thoughts]
  fetchInterestsEnum: async () => {
    const fetchInterestsFn = usePublicMaterials.getState().getAllCategories;
    const response = await fetchInterestsFn();

    if (response) {
      const interestsData = usePublicMaterials.getState().miscData;
      const enumData = {
        thoughts: interestsData.thoughtCategory,
        emotions: interestsData.emotionCategory,
        members: interestsData.memberCategory,
      };
      set(() => ({
        interests: enumData,
      }));
    }
  },
  fetchGroupProfilesEnum: async () => {
    const fetchGroupProfilesFn =
      useGroupStore.getState().getAllPublicGroupProfiles;
    const response = await fetchGroupProfilesFn();

    if (response) {
      const groupProfilesData = useGroupStore.getState().groupData;
      set(() => ({
        groupImages: groupProfilesData,
      }));
    }
  },
  fetchUsersEnum: async () => {
    const fetchUsersFn = useUsersStore.getState().getAllUsers;
    const response = await fetchUsersFn();

    if (response) {
      const usersData = useUsersStore.getState().data;
      set(() => ({
        users: usersData,
      }));
    }
  },
}));

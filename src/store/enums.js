import { create } from "zustand";
import { usePublicMaterials } from "./miscellaneous";

export const useEnumsStore = create((set) => ({
  interests: {
    thoughts: [],
    emotions: [],
    members: [],
  },

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
}));

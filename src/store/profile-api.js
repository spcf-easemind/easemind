import { create } from "zustand";
import { useUsersStore } from "./users";
import { useAuthenticationStore } from "./authentication";

export const useProfileAPIStore = create((set, get) => ({
  loading: false,
  editProfile: null,
  easeCompanionOverview: null,

  fetchEditProfile: async () => {
    const fetchEditProfileFn = useUsersStore.getState().getUserInfo;
    const response = await fetchEditProfileFn();

    if (response) {
      const editProfileData = useUsersStore.getState().data;
      set(() => ({
        editProfile: editProfileData.userCredentials,
      }));
    }
  },

  fetchEaseCompanionOverview: async (loggedInUserId) => {
    const formData = {
      userKey: loggedInUserId,
    };
    const fetchEaseCompanionOverview =
      useUsersStore.getState().getCompanionOverviewInfo;
    const response = await fetchEaseCompanionOverview(formData);

    if (response) {
      const easeCompanionData = useUsersStore.getState().data;
      console.log(easeCompanionData);
      set(() => ({
        easeCompanionOverview: easeCompanionData,
      }));
    }
  },

  updateEaseCompanionOverview: async (formData) => {
    get().setLoading(true);
    const updateEaseCompanionOverviewFn =
      useUsersStore.getState().updateCompanionOverviewInfo;
    const response = await updateEaseCompanionOverviewFn(formData);

    if (response) {
      get().setLoading(false);
      const easeCompanionData = useUsersStore.getState().message;
      return { type: "success", message: easeCompanionData };
    } else {
      get().setLoading(false);
      const easeCompanionData = useUsersStore.getState().message;
      return { type: "error", message: easeCompanionData };
    }
  },

  updateProfile: async (formData) => {
    get().setLoading(true);
    const updateProfileFn = useUsersStore.getState().updateUserInfo;
    const response = await updateProfileFn(formData);

    if (response) {
      get().setLoading(false);
      const fetchEditProfileMessage = useUsersStore.getState().message;
      return { type: "success", message: fetchEditProfileMessage };
    } else {
      get().setLoading(false);
      const fetchEditProfileMessage = useUsersStore.getState().message;
      return { type: "error", message: fetchEditProfileMessage };
    }
  },

  deleteUser: async () => {
    const deleteUserFn = useAuthenticationStore.getState().deleteUserInfo;
    const response = await deleteUserFn();

    if (response) {
      const deleteUserMessage = useAuthenticationStore.getState().message;
      return { type: "success", message: deleteUserMessage };
    } else {
      const deleteUserMessage = useAuthenticationStore.getState().message;
      return { type: "error", message: deleteUserMessage };
    }
  },

  changePassword: async (formData) => {
    const changePasswordFn = useUsersStore.getState().userChangePassword;
    const response = await changePasswordFn(formData);

    if (response) {
      const changePasswordMessage = useUsersStore.getState().message;
      return { type: "success", message: changePasswordMessage };
    } else {
      const changePasswordMessage = useUsersStore.getState().message;
      return { type: "error", message: changePasswordMessage };
    }
  },

  setLoading: (value) => {
    set(() => ({
      loading: value,
    }));
  },
}));

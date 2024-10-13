import { create } from "zustand";
import { setDoc, getDoc, listDocs, deleteDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

export const useUsersStore = create((set) => ({
  data: null,
  message: null,
  loading: false,

  userSignUp: async (formData) => {
    // Loading is True
    set(() => ({ loading: true }));

    try {
      // const key = nanoid();
      const items = await listDocs({
        collection: "userCredentials",
      });

      if (items.items[0]) {
        throw new Error("This identity already have an account!.");
      }

      const key = nanoid();
      await setDoc({
        collection: "userCredentials",
        doc: {
          key,
          data: {
            dateOfBirth: formData.dateOfBirth,
            email: formData.email,
            fullName: formData.fullName,
            mobileNumber: formData.mobileNumber,
            password: formData.password,
            role: formData.role,
          },
        },
      });

      await setDoc({
        collection: "userSurveys",
        doc: {
          key,
          data: formData.survey,
        },
      });

      await setDoc({
        collection: "users",
        doc: {
          key,
          data: {
            key: key,
            fullName: formData.fullName,
            status: "offline",
          },
        },
      });

      // console.log(response);
      set({
        data: {
          fullName: formData.fullName,
          email: formData.email,
        },
        message: "User signed up successfully",
      });

      // Loading is False
      set(() => ({ loading: false }));
    } catch (error) {
      console.error("Error during sign up:", error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
    }
  },

  getUserInfo: async () => {
    try {
      set(() => ({
        data: null,
        message: "Loading...",
      }));

      const items = await listDocs({
        collection: "userCredentials",
      });

      const itemSurveys = await listDocs({
        collection: "userSurveys",
      });

      if (items.items && items.items.length > 0 && items.items[0].data) {
        const userData = {
          userCredentials: items.items[0],
          userSurveys: itemSurveys.items[0],
        };
        set(() => ({
          data: userData,
          message: "User Fetched Successfully!",
        }));
      } else {
        console.log("No user data found");
        set(() => ({
          data: null,
          message: "No user data found",
        }));
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      set(() => ({
        data: null,
        message: error.message || "An error occurred while fetching user data",
      }));
    }
  },

  getAllUsers: async () => {
    // set(() => ({
    //   data: null,
    //   message: "Loading...",
    // }));

    const users = await listDocs({
      collection: "userCredentials",
    });

    console.log(users);

    const allUsers = [];
    for (const user of users.items) {
      allUsers.push(user);
    }

    console.log(allUsers);

    // set(() => ({
    //   data: allUsers,
    //   message: "All users fetched successfully!",
    // }));
  },

  deleteUserInfo: async () => {
    set(() => ({
      data: null,
      message: "Loading...",
    }));

    const items = await listDocs({
      collection: "userCredentials",
    });
    const itemSurveys = await listDocs({
      collection: "userSurveys",
    });

    if (items.items && items.items.length > 0 && items.items[0].data) {
      for (const item of items.items) {
        await deleteDoc({
          collection: "userCredentials",
          doc: item,
        });
        set(() => ({
          data: null,
          message: "User credential deleted successfully!",
        }));
      }

      for (const itemSurvey of itemSurveys.items) {
        await deleteDoc({
          collection: "userSurveys",
          doc: itemSurvey,
        });
        set(() => ({
          data: null,
          message: "User surveys deleted successfully!",
        }));
      }

      const user = getDoc({
        collection: "users",
        key: items.items[0].key,
      });
      await deleteDoc({
        collection: "users",
        doc: user,
      });
      set(() => ({
        data: null,
        message: "User deleted successfully!",
      }));
    } else {
      set(() => ({
        data: null,
        message: "There is no account created on this identity",
      }));
    }
  },

  updateUserInfo: async (formData) => {
    set(() => ({
      data: null,
      message: "Loading...",
    }));

    const items = await listDocs({
      collection: "userCredentials",
    });

    if (items.items && items.items.length > 0 && items.items[0].data) {
      const userData = items.items[0].data;
      const userKey = items.items[0].key;
      const userVersion = items.items[0].version;

      // use the formData when you needed to update the userCredentials.
      const updatedData = {
        dateOfBirth: userData.dateOfBirth,
        email: userData.email,
        fullName: userData.fullName,
        mobileNumber: userData.mobileNumber,
        password: userData.password,
        role: userData.role,
      };

      const user = await getDoc({
        collection: "users",
        key: userKey,
      });

      const updatedUserData = {
        key: user.data.key,
        fullName: user.data.fullName,
        status: "online",
      };

      await setDoc({
        collection: "userCredentials",
        doc: {
          key: userKey,
          data: updatedData,
          version: userVersion,
        },
      });

      const updatedUser = await setDoc({
        collection: "users",
        doc: {
          key: user.key,
          data: updatedUserData,
          version: user.version,
        },
      });

      set(() => ({
        data: updatedUser,
        message: "User Updated Successfully!",
      }));
      console.log(updatedUser);
    }
  },
}));

import { create } from "zustand";
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
} from "@junobuild/core";
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

      const placeholderProfileImage = await listDocs({
        collection: "userPlaceholderImages",
      });

      const placeholderImageUrl =
        placeholderProfileImage.items[0].data.placeholderProfileImagePath;
      if (items.items[0]) {
        throw new Error("This identity already have an account!.");
      }

      const key = nanoid();
      await setDoc({
        collection: "userCredentials",
        doc: {
          key,
          data: {
            profileImageUrl: placeholderImageUrl,
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
            profileImageUrl: placeholderImageUrl,
            key,
            fullName: formData.fullName,
            status: "offline",
            role: formData.role,
          },
        },
      });

      const anonymousName = formData.name
        .split(" ")
        .map((word) => {
          if (word.length > 1) {
            return word[0] + "*".repeat(word.length - 1);
          }
          return word;
        })
        .join(" ");

      await setDoc({
        collection: "anonymousUsers",
        doc: {
          key,
          data: {
            profileImageUrl: placeholderImageUrl,
            key,
            name: anonymousName,
          },
        },
      });

      await setDoc({
        collection: "userGroups",
        doc: {
          key,
          data: {
            groups: [],
          },
        },
      });

      await setDoc({
        collection: "userDiaries",
        doc: {
          key,
          data: {
            moods: [],
            thoughts: [],
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
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));
    try {
      const items = await listDocs({
        collection: "userCredentials",
      });

      const itemSurveys = await listDocs({
        collection: "userSurveys",
      });

      if (items.items && items.items.length > 0 && items.items[0].data) {
        const user = await getDoc({
          collection: "users",
          key: items.items[0].key,
        });

        const userGroup = await getDoc({
          collection: "userGroups",
          key: items.items[0].key,
        });

        const userData = {
          userCredentials: items.items[0],
          userSurveys: itemSurveys.items[0],
          user: user.data,
          userGroup: userGroup.data,
        };
        set(() => ({
          data: userData,
          message: "User Fetched Successfully!",
          loading: false,
        }));
      } else {
        console.log("No user data found");
        set(() => ({
          data: null,
          message: "No user data found",
          loading: false,
        }));
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error fetching user info:", error);
      set(() => ({
        data: null,
        message: error.message || "An error occurred while fetching user data",
      }));
      return false;
    }
  },

  getAllUsers: async () => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));
    try {
      const users = await listDocs({
        collection: "users",
      });

      // const userProfiles = await listAssets({
      //   collection: 'userProfilePicture',
      // });

      // console.log('User Profiles:', userProfiles);

      const allUsers = [];
      for (const user of users.items) {
        allUsers.push(user);
      }

      set(() => ({
        data: allUsers,
        message: "All users fetched successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching all users:", error);
      set(() => ({
        data: null,
        message: error.message || "An error occurred while fetching all users",
        loading: false,
      }));
      return false;
    }
  },

  deleteUserInfo: async () => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));
    try {
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

        const user = await getDoc({
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

        const userProfiles = await listAssets({
          collection: "userProfilePicture",
        });

        for (const userProfile of userProfiles.items) {
          await deleteAsset({
            collection: "userProfilePicture",
            fullPath: userProfile.fullPath,
          });

          set(() => ({
            data: null,
            message: "User profile picture deleted successfully!",
            loading: false,
          }));
        }

        const userGroup = await getDoc({
          collecton: "userGroups",
          key: items.items[0].key,
        });

        await deleteDoc({
          collection: "userGroups",
          doc: userGroup,
        });

        return true;
      } else {
        set(() => ({
          data: null,
          message: "There is no account created on this identity",
        }));
        return false;
      }
    } catch (error) {
      console.error("Error deleting user info:", error);
      set(() => ({
        data: null,
        message: error.message || "An error occurred while deleting user data",
        loading: false,
      }));
      return false;
    }
  },

  deleteAllUsers: async () => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const users = await listDocs({
        collection: "users",
      });

      const userCredentials = await listDocs({
        collection: "userCredentials",
      });

      const userSurveys = await listDocs({
        collection: "userSurveys",
      });

      const userGroups = await listDocs({
        collection: "userGroups",
      });

      for (const userSurvey of userSurveys.items) {
        const user = await getDoc({
          collection: "users",
          key: userSurvey.key,
        });

        await deleteDoc({
          collection: "userSurveys",
          doc: userSurvey,
        });

        console.log(`${user.data.name} user surveys deleted successfully!`);
      }

      for (const userGroup of userGroups.items) {
        const user = await getDoc({
          collection: "users",
          key: userGroup.key,
        });

        await deleteDoc({
          collection: "userGroups",
          doc: userGroup,
        });

        console.log(`${user.data.name} user group deleted successfully!`);
      }

      for (const user of users.items) {
        await deleteDoc({
          collection: "users",
          doc: user,
        });

        console.log(`${user.data.name} user credentials deleted successfully!`);
      }

      for (const userCredential of userCredentials.items) {
        await deleteDoc({
          collection: "userCredentials",
          doc: userCredential,
        });

        console.log(
          `${userCredential.data.name} user credentials deleted successfully!`
        );
      }

      set(() => ({
        groupData: null,
        groupMessage: "All users has been deleted successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error deleting all users:", error);
      set(() => ({
        data: null,
        message: error.message || "An error occurred while deleting all users",
        loading: false,
      }));
      return false;
    }
  },

  // deleteUserProfile: async () => {
  //   const userProfiles = await listAssets({
  //     collection: "userProfilePicture",
  //   });

  //   console.log("results:", userProfiles);
  //   for (const userProfile of userProfiles.items) {
  //     // console.log(userProfile)
  //       const result = await deleteAsset({
  //         collection: "userProfilePicture",
  //         fullPath: userProfile.fullPath
  //       });

  //       set(() => ({
  //         data: null,
  //         message: "User profile picture deleted successfully!",
  //       }));
  //     }
  // },

  updateUserInfo: async (fetchedData, file) => {
    set(() => ({ loading: true }));

    try {
      if (!fetchedData || !fetchedData.userCredentials) {
        throw new Error("User data not available");
      }

      const userData = fetchedData.userCredentials.data;
      const userKey = fetchedData.userCredentials.key;
      const userVersion = fetchedData.userCredentials.version;

      let profileImageUrl = userData.profileImageUrl;

      if (file) {
        const filename = `${userKey}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: "userProfilePicture",
          data: file,
          filename,
        });
        profileImageUrl = downloadUrl;
      }

      const updatedData = {
        ...userData,
        profileImageUrl,
      };

      await setDoc({
        collection: "userCredentials",
        doc: {
          key: userKey,
          data: updatedData,
          version: userVersion,
        },
      });

      const user = await getDoc({
        collection: "users",
        key: userKey,
      });

      const updatedUserData = {
        ...user.data,
        profileImageUrl,
      };

      const updatedUser = await setDoc({
        collection: "users",
        doc: {
          key: user.key,
          data: updatedUserData,
          version: user.version,
        },
      });

      set(() => ({
        data: {
          ...fetchedData,
          userCredentials: {
            ...fetchedData.userCredentials,
            data: updatedData,
          },
        },
        message: "User Updated Successfully!",
        loading: false,
      }));

      return true; // Indicate successful update
    } catch (error) {
      console.error("Error updating user info:", error);
      set(() => ({
        message: error.message || "An error occurred while updating user data",
        loading: false,
      }));
      return false; // Indicate failed update
    }
  },

  uploadPlaceHolderImage: async (file) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      let placeholderProfileImageUrl = null;

      if (file) {
        const key = nanoid();
        const filename = `${key}-placeholder-profile`;
        const { downloadUrl } = await uploadFile({
          collection: "userPlaceholderImages",
          data: file,
          filename,
        });
        placeholderProfileImageUrl = downloadUrl;

        await setDoc({
          collection: "userPlaceholderImages",
          doc: {
            key,
            data: {
              name: filename,
              placeholderProfileImagePath: placeholderProfileImageUrl,
            },
          },
        });
      }

      set(() => ({
        groupData: null,
        groupMessage: "Placeholder Image uploaded successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error uploading placeholder image:", error);
      set(() => ({
        data: null,
        message:
          error.message ||
          "An error occurred while uploading placeholder image",
        loading: false,
      }));
      return false;
    }
  },

  getPlaceHolderProfileImages: async () => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const placeholderProfileImages = await listDocs({
        collection: "userPlaceholderImages",
      });

      const allPlaceholderProfileImages = [];
      for (const placeholderProfileImage of placeholderProfileImages.items) {
        allPlaceholderProfileImages.push(placeholderProfileImage);
      }

      set(() => ({
        data: allPlaceholderProfileImages,
        message: "All placeholder images fetched successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching placeholder images:", error);
      set(() => ({
        data: null,
        message:
          error.message ||
          "An error occurred while fetching placeholder images",
        loading: false,
      }));
      return false;
    }
  },
}));

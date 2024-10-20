import { create } from "zustand";
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
  signOut,
} from "@junobuild/core";
import { nanoid } from "nanoid";
import { get, kebabCase } from "lodash";

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
      let placeholderImageUrl = "";

      if (placeholderProfileImage.items[0].data) {
        placeholderImageUrl =
          placeholderProfileImage.items[0].data.placeholderProfileImagePath;
      }

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
            pronouns: "",
            mobileNumber: formData.mobileNumber,
            password: formData.password,
            role: formData.role,
            lastUpdated: "",
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
            pronouns: "",
            status: "offline",
            role: formData.role,
            companionOverviewKey: key,
            lastUpdated: "",
          },
        },
      });

      await setDoc({
        collection: "userCompanionOverviews",
        doc: {
          key,
          data: {
            key,
            title: "",
            description: "",
            categories: [],
            availability: {
              monday: {
                startTime: "",
                endTime: "",
              },
              tuesday: {
                startTime: "",
                endTime: "",
              },
              wednesday: {
                startTime: "",
                endTime: "",
              },
              thursday: {
                startTime: "",
                endTime: "",
              },
              friday: {
                startTime: "",
                endTime: "",
              },
              saturday: {
                startTime: "",
                endTime: "",
              },
              sunday: {
                startTime: "",
                endTime: "",
              },
            },
          },
        },
      });

      const anonymousName = formData.fullName
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
            role: formData.role,
            status: false,
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

        const userDiary = await getDoc({
          collection: "userDiaries",
          key: items.items[0].key,
        });

        const anonymousUser = await getDoc({
          collection: "anonymousUsers",
          key: items.items[0].key,
        });

        const userData = {
          userCredentials: items.items[0],
          userSurveys: itemSurveys.items[0],
          user: user.data,
          anonymousUser: anonymousUser.data,
          userGroup: userGroup.data,
          userDiary: userDiary.data,
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
        loading: false,
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

      const anonymousUsers = await listDocs({
        collection: "anonymousUsers",
      });

      const userDiaries = await listDocs({
        collection: "userDiaries",
      });

      const userCompanionOverview = await listDocs({
        collection: "userCompanionOverviews",
      });

      if (userSurveys) {
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
      }

      if (userGroups) {
        for (const userGroup of userGroups.items) {
          const user = await getDoc({
            collection: "users",
            key: userGroup.key,
          });

          await deleteDoc({
            collection: "userGroups",
            doc: userGroup,
          });

          console.log(`user group deleted successfully!`);
        }
      }

      if (users) {
        for (const user of users.items) {
          await deleteDoc({
            collection: "users",
            doc: user,
          });

          console.log(
            `${user.data.name} user credentials deleted successfully!`
          );
        }
      }

      if (userCredentials) {
        for (const userCredential of userCredentials.items) {
          await deleteDoc({
            collection: "userCredentials",
            doc: userCredential,
          });

          console.log(
            `${userCredential.data.name} user credentials deleted successfully!`
          );
        }
      }

      if (anonymousUsers) {
        for (const anonymousUser of anonymousUsers.items) {
          await deleteDoc({
            collection: "anonymousUsers",
            doc: anonymousUser,
          });

          console.log(
            `${anonymousUser.data.name} anonymous user deleted successfully!`
          );
        }
      }

      if (userDiaries) {
        for (const userDiary of userDiaries.items) {
          await deleteDoc({
            collection: "userDiaries",
            doc: userDiary,
          });

          console.log(
            `${userDiary.data.name} user diary deleted successfully!`
          );
        }
      }

      if (userCompanionOverview) {
        for (const companionOverview of userCompanionOverview.items) {
          await deleteDoc({
            collection: "userCompanionOverviews",
            doc: companionOverview,
          });

          console.log(
            `${companionOverview.data.name} companion overview deleted successfully!`
          );
        }
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

  updateUserInfo: async (formData) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const userCredential = await getDoc({
        collection: "userCredentials",
        key: formData.userKey,
      });

      const user = await getDoc({
        collection: "users",
        key: formData.userKey,
      });

      const anonymousUser = await getDoc({
        collection: "anonymousUsers",
        key: formData.userKey,
      });

      if (userCredential && user) {
        let profileImageUrl = user.profileImageUrl || formData.profileImageUrl;

        // if (file) {
        //   const filename = `${userKey}-profile`;
        //   const { downloadUrl } = await uploadFile({
        //     collection: "userProfilePicture",
        //     data: file,
        //     filename,
        //   });
        //   profileImageUrl = downloadUrl;
        // }

        userCredential.data.profileImageUrl = profileImageUrl;
        userCredential.data.dateOfBirth = formData.dateOfBirth;
        userCredential.data.email = formData.email;
        userCredential.data.fullName = formData.fullName;
        userCredential.data.mobileNumber = formData.mobileNumber;
        userCredential.data.pronouns = formData.pronouns;

        await setDoc({
          collection: "userCredentials",
          doc: {
            key: userCredential.key,
            data: userCredential.data,
            version: userCredential.version,
          },
        });

        user.data.profileImageUrl = profileImageUrl;
        user.data.fullName = formData.fullName;
        user.data.pronouns = formData.pronouns;

        await setDoc({
          collection: "users",
          doc: {
            key: user.key,
            data: user.data,
            version: user.version,
          },
        });

        const anonymousName = formData.fullName
          .split(" ")
          .map((word) => {
            if (word.length > 1) {
              return word[0] + "*".repeat(word.length - 1);
            }
            return word;
          })
          .join(" ");

        anonymousUser.data.name = anonymousName;

        await setDoc({
          collection: "anonymousUsers",
          doc: {
            key: anonymousUser.key,
            data: anonymousUser.data,
            version: anonymousUser.version,
          },
        });
      }

      set(() => ({
        data: null,
        message: "User data updated successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error updating user info:", error);
      set(() => ({
        message: error.message || "An error occurred while updating user data",
        loading: false,
      }));
      return false;
    }
  },

  createCompanionOverviewInfo: async (formData) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      await setDoc({
        collection: "userCompanionOverviews",
        doc: {
          key: formData.userKey,
          data: {
            key: formData.userKey,
            title: formData.title,
            description: formData.description,
            categories: formData.categories,
            availability: {
              monday: {
                startTime: formData.mondayStartTime,
                endTime: formData.mondayEndTime,
              },
              tuesday: {
                startTime: formData.tuesdayStartTime,
                endTime: formData.tuesdayEndTime,
              },
              wednesday: {
                startTime: formData.wednesdayStartTime,
                endTime: formData.wednesdayEndTime,
              },
              thursday: {
                startTime: formData.thursdayStartTime,
                endTime: formData.thursdayEndTime,
              },
              friday: {
                startTime: formData.fridayStartTime,
                endTime: formData.fridayEndTime,
              },
              saturday: {
                startTime: formData.saturdayStartTime,
                endTime: formData.saturdayEndTime,
              },
              sunday: {
                startTime: formData.sundayStartTime,
                endTime: formData.sundayEndTime,
              },
            },
          },
        },
      });

      set(() => ({
        data: null,
        message: "Companion data created successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error creating companion info:", error);
      set(() => ({
        message:
          error.message || "An error occurred while creating companion data",
        loading: false,
      }));
      return false;
    }
  },

  updateCompanionOverviewInfo: async (formData) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const userCompanionOverview = await getDoc({
        collection: "userCompanionOverviews",
        key: formData.userKey,
      });

      if (userCompanionOverview) {
        userCompanionOverview.data.title = formData.title;
        userCompanionOverview.data.description = formData.description;

        const categories = [];
        if (formData.categories.length > 0) {
          for (const category of formData.categories) {
            const categoryData = await getDoc({
              collection: "categories",
              key: category.key,
            });

            if (category) {
              categories.push(categoryData);
            }
          }
        }
        userCompanionOverview.data.categories = categories;
        userCompanionOverview.data.availability = {
          monday: {
            startTime: formData.availability.monday.startTime,
            endTime: formData.availability.monday.endTime,
          },
          tuesday: {
            startTime: formData.availability.tuesday.startTime,
            endTime: formData.availability.tuesday.endTime,
          },
          wednesday: {
            startTime: formData.availability.wednesday.startTime,
            endTime: formData.availability.wednesday.endTime,
          },
          thursday: {
            startTime: formData.availability.thursday.startTime,
            endTime: formData.availability.thursday.endTime,
          },
          friday: {
            startTime: formData.availability.friday.startTime,
            endTime: formData.availability.friday.endTime,
          },
          saturday: {
            startTime: formData.availability.saturday.startTime,
            endTime: formData.availability.saturday.endTime,
          },
          sunday: {
            startTime: formData.availability.sunday.startTime,
            endTime: formData.availability.sunday.endTime,
          },
        };

        await setDoc({
          collection: "userCompanionOverviews",
          doc: {
            key: userCompanionOverview.key,
            data: userCompanionOverview.data,
            version: userCompanionOverview.version,
          },
        });
      }

      set(() => ({
        data: null,
        message: "Companion data updated successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error updating companion info:", error);
      set(() => ({
        message:
          error.message || "An error occurred while updating companion data",
        loading: false,
      }));
      return false;
    }
  },

  getCompanionOverviewInfo: async (formData) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const userCompanionOverview = await getDoc({
        collection: "userCompanionOverviews",
        key: formData.userKey,
      });

      set(() => ({
        data: userCompanionOverview.data,
        message: "Companion data fetched successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching companion info:", error);
      set(() => ({
        message:
          error.message || "An error occurred while fetching companion data",
        loading: false,
      }));
      return false;
    }
  },

  userChangePassword: async (formData) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const userCredential = await getDoc({
        collection: "userCredentials",
        key: formData.userKey,
      });

      if (userCredential) {
        if (
          userCredential.data.password === formData.currentPassword &&
          formData.newPassword === formData.confirmPassword
        ) {
          userCredential.data.password = formData.newPassword;

          await setDoc({
            collection: "userCredentials",
            doc: {
              key: userCredential.key,
              data: userCredential.data,
              version: userCredential.version,
            },
          });
        } else {
          set(() => ({
            data: null,
            message: "Password mismatch!",
            loading: false,
          }));
          return false;
        }
      } else {
        set(() => ({
          data: null,
          message: "User not found!",
          loading: false,
        }));
        return false;
      }

      set(() => ({
        data: null,
        message: "User password changed successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error changing password:", error);
      set(() => ({
        message:
          error.message || "An error occurred while changing user password",
        loading: false,
      }));
      return false;
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

  getUserActiveCompanion: async (userCompanionKey) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const user = await getDoc({
        collection: "users",
        key: userCompanionKey,
      });

      const userCompanionOverview = await getDoc({
        collection: "userCompanionOverviews",
        key: userCompanionKey,
      });

      const userGroup = await getDoc({
        collection: "userGroups",
        key: userCompanionKey,
      });

      if (user && userCompanionOverview && userGroup) {
        let userGroupInfo = [];
        for (const groupData of userGroup.data.groups) {
          const group = await getDoc({
            collection: "groups",
            key: groupData.key,
          });
          const groupInfo = {
            key: group.data.key,
            groupImageUrl: group.data.groupImageUrl,
            name: group.data.name,
            membersCount: group.data.membersCount,
          };
          userGroupInfo.push(groupInfo);
        }
        const userData = {
          user: user.data,
          userCompanionOverview: userCompanionOverview.data,
          userGroup: userGroupInfo,
        };

        set(() => ({
          data: userData,
          message: "Active companion fetched successfully!",
          loading: false,
        }));
        return true;
      } else {
        set(() => ({
          data: null,
          message: "Active companion not found!",
          loading: false,
        }));
        return false;
      }
    } catch (error) {
      console.error("Error fetching active companion:", error);
      set(() => ({
        message:
          error.message || "An error occurred while fetching active companion",
        loading: false,
      }));
      return false;
    }
  },

  getAllUserActiveCompanions: async () => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));
    try {
      const users = await listDocs({
        collection: "users",
      });

      let activeCompanions = [];
      for (const user of users.items) {
        if (
          user.data.role === "EaseCompanion" &&
          user.data.status === "online"
        ) {
          const userCompanionOverview = await getDoc({
            collection: "userCompanionOverviews",
            key: user.key,
          });

          const newData = {
            user: user.data,
            userCompanionOverview: userCompanionOverview.data,
          };

          activeCompanions.push(newData);
        }
      }

      set(() => ({
        data: activeCompanions,
        message: "All active companions fetched successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching active companions:", error);
      set(() => ({
        data: null,
        message:
          error.message || "An error occurred while fetching active companions",
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

  createSuperAdmin: async () => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));
    try {
      const users = await listDocs({
        collection: "users",
      });

      for (const user of users.items) {
        if (user.data.role === "super-admin") {
          throw new Error("Super Admin already exists!");
        }
      }

      const key = nanoid();
      await setDoc({
        collection: "userCredentials",
        doc: {
          key,
          data: {
            profileImageUrl: "",
            dateOfBirth: "",
            email: "superadmin@spcf.edu.ph",
            fullName: "Super Admin",
            pronouns: "",
            mobileNumber: "",
            password: "developer",
            role: "super-admin",
          },
        },
      });

      await setDoc({
        collection: "users",
        doc: {
          key,
          data: {
            profileImageUrl: "",
            key,
            fullName: "Super Admin",
            status: "offline",
            role: "super-admin",
            companionOverviewKey: key,
          },
        },
      });

      await setDoc({
        collection: "userCompanionOverviews",
        doc: {
          key,
          data: {
            key,
            title: "",
            description: "",
            categories: [],
            availability: {
              monday: {
                startTime: "",
                endTime: "",
              },
              tuesday: {
                startTime: "",
                endTime: "",
              },
              wednesday: {
                startTime: "",
                endTime: "",
              },
              thursday: {
                startTime: "",
                endTime: "",
              },
              friday: {
                startTime: "",
                endTime: "",
              },
              saturday: {
                startTime: "",
                endTime: "",
              },
              sunday: {
                startTime: "",
                endTime: "",
              },
            },
          },
        },
      });

      set(() => ({
        data: null,
        message: "Super Admin created successfully!",
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error creating super admin:", error);
      set(() => ({
        data: null,
        message:
          error.message || "An error occurred while creating super admin",
        loading: false,
      }));
      return false;
    }
  },

  superAdmin: async (userKey) => {
    set(() => ({
      data: null,
      message: "Loading...",
      loading: true,
    }));

    try {
      const userCredential = await getDoc({
        collection: "userCredentials",
        key: userKey,
      });

      const user = await getDoc({
        collection: "users",
        key: userKey,
      });

      if (user) {
        user.data.fullName = "Super Admin";
        userCredential.data.fullName = "Super Admin";
        userCredential.data.role = "super-admin";
        userCredential.data.email = "superadmin@spcf.edu.ph";
        userCredential.data.password = "developer";
        user.data.role = "super-admin";

        await setDoc({
          collection: "userCredentials",
          doc: {
            key: userCredential.key,
            data: userCredential.data,
            version: userCredential.version,
          },
        });

        await setDoc({
          collection: "users",
          doc: {
            key: user.key,
            data: user.data,
            version: user.version,
          },
        });

        set(() => ({
          data: null,
          message: "User role updated to Super Admin successfully!",
          loading: false,
        }));
        return true;
      } else {
        set(() => ({
          data: null,
          message: "User not found!",
          loading: false,
        }));
        return false;
      }
    } catch (error) {
      console.error("Error updating user role to Super Admin:", error);
      set(() => ({
        message:
          error.message ||
          "An error occurred while updating user role to Super Admin",
        loading: false,
      }));
      return false;
    }
  },
}));

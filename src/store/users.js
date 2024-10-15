import { create } from 'zustand';
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
} from '@junobuild/core';
import { nanoid } from 'nanoid';

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
        collection: 'userCredentials',
      });

      if (items.items[0]) {
        throw new Error('This identity already have an account!.');
      }

      const key = nanoid();
      await setDoc({
        collection: 'userCredentials',
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
        collection: 'userSurveys',
        doc: {
          key,
          data: formData.survey,
        },
      });

      await setDoc({
        collection: 'users',
        doc: {
          key,
          data: {
            key: key,
            fullName: formData.fullName,
            status: 'offline',
            role: formData.role
          },
        },
      });

      // console.log(response);
      set({
        data: {
          fullName: formData.fullName,
          email: formData.email,
        },
        message: 'User signed up successfully',
      });

      // Loading is False
      set(() => ({ loading: false }));
    } catch (error) {
      console.error('Error during sign up:', error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
    }
  },

  getUserInfo: async () => {
    try {
      const items = await listDocs({
        collection: 'userCredentials',
      });

      const itemSurveys = await listDocs({
        collection: 'userSurveys',
      });

      if (items.items && items.items.length > 0 && items.items[0].data) {
        const user = await getDoc({
          collection: 'users',
          key: items.items[0].key,
        });

        const userData = {
          userCredentials: items.items[0],
          userSurveys: itemSurveys.items[0],
          user: user.data,
        };
        set(() => ({
          data: userData,
          message: 'User Fetched Successfully!',
        }));
      } else {
        console.log('No user data found');
        set(() => ({
          data: null,
          message: 'No user data found',
        }));
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      set(() => ({
        data: null,
        message: error.message || 'An error occurred while fetching user data',
      }));
    }
  },

  getAllUsers: async () => {
    // set(() => ({
    //   data: null,
    //   message: "Loading...",
    // }));

    const users = await listDocs({
      collection: 'users',
    });

    // console.log(users);
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
      message: 'All users fetched successfully!',
    }));

    return allUsers;
  },

  deleteUserInfo: async () => {
    set(() => ({
      data: null,
      message: 'Loading...',
    }));

    const items = await listDocs({
      collection: 'userCredentials',
    });
    const itemSurveys = await listDocs({
      collection: 'userSurveys',
    });

    if (items.items && items.items.length > 0 && items.items[0].data) {
      for (const item of items.items) {
        await deleteDoc({
          collection: 'userCredentials',
          doc: item,
        });
        set(() => ({
          data: null,
          message: 'User credential deleted successfully!',
        }));
      }

      for (const itemSurvey of itemSurveys.items) {
        await deleteDoc({
          collection: 'userSurveys',
          doc: itemSurvey,
        });
        set(() => ({
          data: null,
          message: 'User surveys deleted successfully!',
        }));
      }

      const user = await getDoc({
        collection: 'users',
        key: items.items[0].key,
      });

      await deleteDoc({
        collection: 'users',
        doc: user,
      });

      set(() => ({
        data: null,
        message: 'User deleted successfully!',
      }));

      const userProfiles = await listAssets({
        collection: 'userProfilePicture',
      });

      for (const userProfile of userProfiles.items) {
        await deleteAsset({
          collection: 'userProfilePicture',
          fullPath: userProfile.fullPath,
        });

        set(() => ({
          data: null,
          message: 'User profile picture deleted successfully!',
        }));
      }
    } else {
      set(() => ({
        data: null,
        message: 'There is no account created on this identity',
      }));
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
        throw new Error('User data not available');
      }

      const userData = fetchedData.userCredentials.data;
      const userKey = fetchedData.userCredentials.key;
      const userVersion = fetchedData.userCredentials.version;

      let profileImageUrl = userData.profileImageUrl;

      if (file) {
        const filename = `${userKey}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: 'userProfilePicture',
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
        collection: 'userCredentials',
        doc: {
          key: userKey,
          data: updatedData,
          version: userVersion,
        },
      });

      const user = await getDoc({
        collection: 'users',
        key: userKey,
      });

      const updatedUserData = {
        ...user.data,
        profileImageUrl,
      };

      const updatedUser = await setDoc({
        collection: 'users',
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
        message: 'User Updated Successfully!',
        loading: false,
      }));

      return true; // Indicate successful update
    } catch (error) {
      console.error('Error updating user info:', error);
      set(() => ({
        message: error.message || 'An error occurred while updating user data',
        loading: false,
      }));
      return false; // Indicate failed update
    }
  },
}));

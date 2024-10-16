import { create } from 'zustand';
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
  getManyDocs,
} from '@junobuild/core';
import { nanoid } from 'nanoid';

export const useGroup = create((set) => ({
  groupData: null,
  groupMessage: null,
  groupLoading: false,

  publicGroupProfile: async (file) => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));
    try {
      let groupProfileImageUrl = null;

      if (file) {
        const key = nanoid();
        const filename = `${key}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: 'groupProfileCollections',
          data: file,
          filename,
        });
        groupProfileImageUrl = downloadUrl;

        await setDoc({
          collection: 'groupProfileCollections',
          doc: {
            key,
            data: {
              name: filename,
              groupProfileImagePath: groupProfileImageUrl,
            },
          },
        });
      }

      set(() => ({
        groupData: null,
        groupMessage: 'Group Profile Image uploaded successfully!',
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error uploading group profile image:', error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          'An error occurred while uploading group profile image',
        groupLoading: false,
      }));
      return false;
    }
  },

  getAllPublicGroupProfiles: async () => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));

    try {
      const allGroupProfiles = await listDocs({
        collection: 'groupProfileCollections',
      });

      const groupImagePathArray = [];
      for (const groupProfile of allGroupProfiles.items) {
        groupImagePathArray.push(groupProfile.data);
      }

      set(() => ({
        groupData: groupImagePathArray,
        groupMessage: 'Group public profile fetched successfully!',
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error fetching all public group profiles:', error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          'An error occurred while fetching all group profiles data',
        groupLoading: false,
      }));
      return false;
    }
  },

  createGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));

    try {
      const key = nanoid();

      if (formData && formData.groupProfilePath) {
        // const filename = `${key}-profile`;
        // const { downloadUrl } = await uploadFile({
        //   collection: 'groupProfiles',
        //   data: file,
        //   filename,
        // });
        // groupImageUrl = downloadUrl;

        let groupImageUrl = formData.groupProfilePath;

        const user = await getDoc({
          collection: 'users',
          key: formData.ownerKey,
        });

        const getCategoriesArray = [];

        for (const category of formData.categories) {
          const query = {
            collection: 'categories',
            key: category.key,
          };
          getCategoriesArray.push(query);
        }

        const categories = await getManyDocs({ docs: getCategoriesArray });
        const categoriesArray = [];

        for (const category of categories) {
          categoriesArray.push(category);
        }

        const createData = {
          key,
          owner: user.data,
          groupImageUrl,
          name: formData.name,
          description: formData.description,
          categories: categoriesArray,
          members: formData.members,
          membersCount: formData.members.length,
        };

        await setDoc({
          collection: 'groups',
          doc: {
            key,
            data: createData,
          },
        });

        for (const member of formData.members) {
          await setDoc({
            collection: 'userGroups',
            doc: {
              key: member.key,
              data: {
                key,
                groupName: formData.name,
              },
            },
          });
        }
      }

      set(() => ({
        groupData: null,
        groupMEssage: 'Group created successfully!',
        groupLoading: true,
      }));
      return true;
    } catch (error) {
      console.error('Error creating group:', error);
      set(() => ({
        groupData: null,
        groupMessage: error.message || 'An error occurred while creating group',
        groupLoading: false,
      }));
      return false;
    }
  },

  getGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));

    try {
      const group = await getDoc({
        collection: 'groups',
        key: formData.groupKey,
      });

      set(() => ({
        data: group.data,
        message: 'Group Info',
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating user info:', error);
      set(() => ({
        data: null,
        message: error.message || 'An error occurred while updating user data',
        loading: false,
      }));
    }
  },

  getAllGroups: async () => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));

    try {
      const allGroups = await listDocs({
        collection: 'groups',
      });

      const allGroupsArray = [];

      for (const group of allGroups.items) {
        allGroupsArray.push(group.data);
      }
      set(() => ({
        groupData: allGroupsArray,
        groupMessage: 'All Group fetched successfully!',
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error updating user info:', error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || 'An error occurred while updating user data',
        groupLoading: false,
      }));
      return false;
    }
  },

  getUserGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));

    try {
      const userGroups = await listDocs({
        collection: 'userGroups',
      });

      const userGroupArray = [];

      for (const userGroup of userGroups.items) {
        if (userGroup.key === formData.userKey) {
          userGroupArray.push(userGroup.data);
        }
      }

      const userGroupInfoArray = [];
      for (const userGroupItem of userGroupArray) {
        const group = await getDoc({
          collection: 'groups',
          key: userGroupItem.key,
        });
        userGroupInfoArray.push(group);
      }

      set(() => ({
        data: userGroupInfoArray,
        message: 'User Group List',
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error updating user info:', error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || 'An error occurred while updating user data',
        groupLoading: false,
      }));
      return false;
    }
  },

  removeMember: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));

    try {
      const group = await getDoc({
        collection: 'groups',
        key: formData.groupKey,
      });

      const userGroup = await getDoc({
        collection: 'userGroups',
        key: formData.userKey,
      });

      const updatedMembersArray = [];
      for (let member of group.members) {
        if (member.key && member.key != formData.userKey) {
          updatedMembers.push(member);
        }
      }

      group.data.members = updatedMembersArray;

      await setDoc({
        collection: 'groups',
        doc: {
          key: formData.groupKey,
          data: group.data,
          version: group.version,
        },
      });

      set(() => ({
        groupData: null,
        groupMessage: 'User has been removed successfully!',
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error updating user info:', error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || 'An error occurred while updating user data',
        groupLoading: false,
      }));
      return false;
    }
  },
}));

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

export const useGroup = create((set) => ({
  data: null,
  message: null,
  loading: false,

  publicGroupProfile: async (file) => {
    set(() => ({ loading: true }));
    try {
      let profileImageUrl = userData.profileImageUrl;

      if (file) {
        key = nanoid();
        const filename = `${key}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: 'groupProfileCollections',
          data: file,
          filename,
        });
        profileImageUrl = downloadUrl;
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      set(() => ({
        data: null,
        message: error.message || 'An error occurred while updating user data',
        loading: false,
      }));
    }
  },

  getAllPublicGroupProfiles: async () => {
    set(() => ({ loading: true }));

    try {
      const groupProfiles = await listAssets({
        collection: 'groupProfileCollections',
      });

      const groupImagePathArray = [];
      for (const downloadUrl of groupProfiles.items.downloadUrl) {
        groupImagePathArray.push(downloadUrl);
      }

      set(() => ({
        data: groupImagePathArray,
        message: 'Group public profile fetched successfully!',
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

  createGroup: async (formData, file) => {
    set(() => ({ loading: true }));

    try {
      const key = nanoid();
      let groupImageUrl = null;
      if (file) {
        const filename = `${key}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: 'groupProfiles',
          data: file,
          filename,
        });
        groupImageUrl = downloadUrl;
      }

      const createData = {
        key,
        owner: formData.userKey,
        groupImageUrl,
        name: formData.name,
        description: formData.description,
        categories: formData.categories,
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

      set(() => ({ loading: true }));
    } catch (error) {
      console.error('Error updating user info:', error);
      set(() => ({
        data: null,
        message: error.message || 'An error occurred while updating user data',
        loading: false,
      }));
    }
  },

  getGroups: async (formData) => {
    set(() => ({ loading: true }));

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

  getUserGroup: async (formData) => {
    set(() => ({ loading: true }));

    try {
      const userGroups = await listDocs({
        collection: 'userGroups',
        matcher: {
          key: formData.userKey,
        },
      });

      const userGroupArray = [];
      for (const userGroup of userGroups.items) {
        userGroupArray.push(userGroup.data);
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
    } catch (error) {}
  },

  removeMember: async (formData) => {
    set(() => ({ loading: true }));

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
        data: null,
        message: 'User has been removed successfully!',
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
}));

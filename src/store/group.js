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
import { IconUser } from '@tabler/icons-react';

export const useGroupStore = create((set) => ({
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
          const userGroup = await getDoc({
            collection: 'userGroups',
            key: member.key,
          });

          if (userGroup) {
            const data = {
              key,
              groupName: formData.name,
            };

            userGroup.data.groups.push(data);

            await setDoc({
              collection: 'userGroups',
              data: userGroup.data,
              version: userGroup.version,
            });
          } else {
            await setDoc({
              collection: 'userGroups',
              doc: {
                key: member.key,
                data: {
                  groups: [
                    {
                      key,
                      groupName: formData.name,
                    },
                  ],
                },
              },
            });
          }
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
      const allGroupsArray = [];

      const allGroups = await listDocs({
        collection: 'groups',
      });

      console.log('all groups: ', allGroups);
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

      console.log(userGroups);
      const userGroupInfoArray = [];
      for (const userGroupItem of userGroupArray) {
        const group = await getDoc({
          collection: 'groups',
          key: userGroupItem.key,
        });
        userGroupInfoArray.push(group);
      }

      set(() => ({
        groupData: userGroupInfoArray,
        groupMessage: 'User Group List',
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

      const userGroups = await getDoc({
        collection: 'userGroups',
        key: formData.userKey,
      });

      const updatedMembersArray = [];
      for (let member of group.members) {
        if (member.key && member.key != formData.userKey) {
          updatedMembersArray.push(member);
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

      const updatedUserGroupArray = [];
      for (const userGroup of userGroups.data.groups) {
        if (group && userGroup != group.key)
          updatedUserGroupArray.push(userGroup);
      }

      userGroups.data.groups = updatedUserGroupArray;

      await setDoc({
        collection: 'userGroups',
        doc: {
          key: userGroups.key,
          data: userGroups.data,
          version: userGroups.version,
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
  deleteUserGroup: async (groupKey) => {
    set(() => ({
      groupData: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));

    try {
      if (groupKey) {
        const group = await getDoc({
          collection: 'groups',
          key: groupKey,
        });
        // console.log(group.data.members);
        for (const member of group.data.members) {
          const user = await getDoc({
            collection: 'userGroups',
            key: member.key,
          });

          const updatedUserGroupsArray = [];

          for (const userGroup of user.data.groups) {
            if (
              userGroup.key != group.key &&
              userGroup.groupName != group.data.name
            ) {
              updatedUserGroupsArray.push(userGroup);
            }
          }

          user.data.members = updatedUserGroupsArray;

          await setDoc({
            collection: 'userGroups',
            doc: {
              key: groupKey,
              data: user.data,
              version: user.version,
            },
          });
        }

        await deleteDoc({
          collection: 'groups',
          doc: group,
        });

        set(() => ({
          groupData: null,
          groupMessage: 'Group has been deleted successfully!',
          groupLoading: false,
        }));
        return true;
      } else {
        set(() => ({
          groupData: null,
          groupMessage: 'Group key is required!',
          groupLoading: false,
        }));
        return false;
      }
    } catch (error) {
      console.error('Error deleting user group:', error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || 'An error occurred while deleting user group',
        groupLoading: false,
      }));
      return false;
    }
  },

  joinUserGroup: async (formData) => {
    set(() => ({
      groupLoading: null,
      groupMessage: 'Loading...',
      groupLoading: true,
    }));
    try {
      const userGroup = await getDoc({
        collection: 'userGroups',
        key: formData.userKey,
      });

      const group = await getDoc({
        collection: 'groups',
        key: formData.groupKey,
      });

      if (userGroup && group) {
        const data = {
          key: group.key,
          groupName: group.data.name,
        };

        userGroup.data.groups.push(data);

        await setDoc({
          collection: 'userGroups',
          data: userGroup.data,
          version: userGroup.version,
        });
      } else {
        await setDoc({
          collection: 'userGroups',
          doc: {
            key: formData.userKey,
            data: {
              groups: [
                {
                  key: group.key,
                  groupName: group.data.name,
                },
              ],
            },
          },
        });
      }
      set(() => ({
        groupData: null,
        groupMessage: 'User joined the group successfully!',
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error('Error joining user into the selected group:', error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          'An error occurred while attempting to join user into the group',
        groupLoading: false,
      }));
      return false;
    }
  },
}));

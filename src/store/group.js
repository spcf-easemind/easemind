import { create } from "zustand";
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
  getManyDocs,
} from "@junobuild/core";
import { nanoid } from "nanoid";
import { IconUser } from "@tabler/icons-react";
import { tr } from "date-fns/locale";
import { defineConsoleConfig } from "@junobuild/config";

export const useGroupStore = create((set) => ({
  groupData: null,
  groupMessage: null,
  groupLoading: false,

  publicGroupProfile: async (file) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));
    try {
      let groupProfileImageUrl = null;

      if (file) {
        const key = nanoid();
        const filename = `${key}-profile`;
        const { downloadUrl } = await uploadFile({
          collection: "groupProfileCollections",
          data: file,
          filename,
        });
        groupProfileImageUrl = downloadUrl;

        await setDoc({
          collection: "groupProfileCollections",
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
        groupMessage: "Group Profile Image uploaded successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error uploading group profile image:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while uploading group profile image",
        groupLoading: false,
      }));
      return false;
    }
  },

  getAllPublicGroupProfiles: async () => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const allGroupProfiles = await listDocs({
        collection: "groupProfileCollections",
      });

      const groupImagePathArray = [];
      for (const groupProfile of allGroupProfiles.items) {
        groupImagePathArray.push(groupProfile.data);
      }

      set(() => ({
        groupData: groupImagePathArray,
        groupMessage: "Group public profile fetched successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching all public group profiles:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while fetching all group profiles data",
        groupLoading: false,
      }));
      return false;
    }
  },

  createGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const key = nanoid();

      let createdGroupKey = "";
      if (formData && formData.groupProfilePath) {
        let groupImageUrl = formData.groupProfilePath;

        const user = await getDoc({
          collection: "users",
          key: formData.ownerKey,
        });

        const getCategoriesArray = [];

        for (const category of formData.categories) {
          const query = {
            collection: "categories",
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

        const groupInfo = await setDoc({
          collection: "groups",
          doc: {
            key,
            data: createData,
          },
        });

        createdGroupKey = groupInfo.key;

        await setDoc({
          collection: "groupPendingMembers",
          doc: {
            key,
            data: {
              pendingMembers: [],
            },
          },
        });

        for (const member of formData.members) {
          const userGroup = await getDoc({
            collection: "userGroups",
            key: member.key,
          });

          if (userGroup) {
            const data = {
              key,
              groupName: formData.name,
            };

            userGroup.data.groups.push(data);

            await setDoc({
              collection: "userGroups",
              doc: {
                key: userGroup.key,
                data: userGroup.data,
                version: userGroup.version,
              },
            });
          } else {
            await setDoc({
              collection: "userGroups",
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
        groupData: createdGroupKey,
        groupMEssage: "Group created successfully!",
        groupLoading: true,
      }));
      return true;
    } catch (error) {
      console.error("Error creating group:", error);
      set(() => ({
        groupData: null,
        groupMessage: error.message || "An error occurred while creating group",
        groupLoading: false,
      }));
      return false;
    }
  },

  getGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const group = await getDoc({
        collection: "groups",
        key: formData.groupKey,
      });

      set(() => ({
        groupData: group.data,
        groupMessage: "Group Info",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error updating user info:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while updating user data",
        groupLoading: false,
      }));
      return false;
    }
  },

  getAllGroups: async () => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const allGroupsArray = [];

      const allGroups = await listDocs({
        collection: "groups",
      });

      for (const group of allGroups.items) {
        allGroupsArray.push(group.data);
      }

      set(() => ({
        groupData: allGroupsArray,
        groupMessage: "All Group fetched successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error updating user info:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while updating user data",
        groupLoading: false,
      }));
      return false;
    }
  },

  getUserGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const userGroup = await getDoc({
        collection: "userGroups",
        key: formData.userKey,
      });

      const userGroupArray = [];
      for (const groupOfUser of userGroup.data.groups) {
        const group = await getDoc({
          collection: "groups",
          key: groupOfUser.key,
        });

        if (userGroup.key != group.data.owner.key) {
          userGroupArray.push(group);
        }
      }

      set(() => ({
        groupData: userGroupArray,
        groupMessage: "User Group List",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error updating user info:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while updating user data",
        groupLoading: false,
      }));
      return false;
    }
  },

  getUserJoinedGroups: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));
    try {
      const userGroup = await getDoc({
        collection: "userGroups",
        key: formData.userKey,
      });

      const userGroupArray = [];
      for (const groupOfUser of userGroup.data.groups) {
        const group = await getDoc({
          collection: "groups",
          key: groupOfUser.key,
        });

        userGroupArray.push(group.data);
      }

      set(() => ({
        groupData: userGroupArray,
        groupMessage: "User Group List",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error updating user info:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while updating user data",
        groupLoading: false,
      }));
      return;
    }
  },

  editGroupInfo: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const group = await getDoc({
        collection: "groups",
        key: formData.groupKey,
      });

      if (group) {
        const user = await getDoc({
          collection: "users",
          key: formData.updatedGroupInfo.ownerKey,
        });

        group.data.key = formData.groupKey;
        group.data.owner = user.data;
        group.data.groupImageUrl = formData.updatedGroupInfo.groupProfilePath;
        group.data.name = formData.updatedGroupInfo.name;
        group.data.description = formData.updatedGroupInfo.description;

        let newCategories = [];

        for (const groupCategory of formData.updatedGroupInfo.categories) {
          const category = await getDoc({
            collection: "categories",
            key: groupCategory.key,
          });

          newCategories.push(category);
        }
        group.data.categories = newCategories;

        for (const newMember of formData.updatedGroupInfo.newAddedMembers) {
          const userGroup = await getDoc({
            collection: "userGroups",
            key: newMember.key,
          });

          if (userGroup) {
            const newData = {
              key: group.key,
              groupName: group.data.name,
            };

            userGroup.data.groups.push(newData);

            await setDoc({
              collection: "userGroups",
              doc: {
                key: userGroup.key,
                data: userGroup.data,
                version: userGroup.version,
              },
            });

            group.data.members.push(newMember);

          }
        }
        group.data.membersCount = group.data.members.length;

        await setDoc({
          collection: "groups",
          doc: {
            key: group.key,
            data: group.data,
            version: group.version,
          },
        });
      }

      set(() => ({
        groupData: null,
        groupMessage: "Group modified successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error modifying group info:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while modifying group info",
        groupLoading: false,
      }));
      return false;
    }
  },

  removeMember: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const group = await getDoc({
        collection: "groups",
        key: formData.groupKey,
      });

      const updatedMembersArray = [];
      for (let member of group.data.members) {
        if (member.key && member.key != formData.userKey) {
          updatedMembersArray.push(member);
        } else {
          const userGroup = await getDoc({
            collection: "userGroups",
            key: member.key,
          });

          let updateUserGroupArray = [];
          for (const groupOfUser of userGroup.data.groups) {
            if (group.key != groupOfUser.key) {
              updateUserGroupArray.push(groupOfUser);
            }
          }

          userGroup.data.groups = updateUserGroupArray;

          await setDoc({
            collection: "userGroups",
            doc: {
              key: userGroup.key,
              data: userGroup.data,
              version: userGroup.version,
            },
          });

          console.log(
            `This group ${group.data.name} user removed successfully!`
          );
        }
      }

      group.data.members = updatedMembersArray;
      const membersLength = group.data.members.length;
      group.data.membersCount = membersLength;

      await setDoc({
        collection: "groups",
        doc: {
          key: formData.groupKey,
          data: group.data,
          version: group.version,
        },
      });

      set(() => ({
        groupData: null,
        groupMessage: "User has been removed successfully!",
        groupLoading: false,
      }));

      return true;
    } catch (error) {
      console.error("Error updating user info:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while updating user data",
        groupLoading: false,
      }));
      return false;
    }
  },

  deleteGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      if (formData.groupKey) {
        const group = await getDoc({
          collection: "groups",
          key: formData.groupKey,
        });

        const groupPendingMembers = await getDoc({
          collection: "groupPendingMembers",
          key: formData.groupKey,
        });

        for (const groupMember of group.data.members) {
          const userGroup = await getDoc({
            collection: "userGroups",
            key: groupMember.key,
          });

          let updateUserGroups = [];
          for (const groupOfUser of userGroup.data.groups) {
            if (group.key != groupOfUser.key) {
              updateUserGroups.push(groupOfUser);
            }
          }

          userGroup.data.groups = updateUserGroups;

          await setDoc({
            collection: "userGroups",
            doc: {
              key: userGroup.key,
              data: userGroup.data,
              version: userGroup.version,
            },
          });
          console.log("This group has been removed on the user list of groups");
        }

        const ownerGroup = await getDoc({
          collection: "userGroups",
          key: group.data.owner.key,
        });

        let updateOwnerGroups = [];
        for (const group of ownerGroup.data.groups) {
          if (group.key != formData.groupKey) {
            updateOwnerGroups.push(group);
          }
        }
        ownerGroup.data.groups = updateOwnerGroups;
        await setDoc({
          collection: "userGroups",
          doc: {
            key: ownerGroup.key,
            data: ownerGroup.data,
            version: ownerGroup.version,
          },
        });

        await deleteDoc({
          collection: "groupPendingMembers",
          doc: groupPendingMembers,
        });

        await deleteDoc({
          collection: "groups",
          doc: group,
        });

        set(() => ({
          groupData: null,
          groupMessage: "Group deleted successfully!",
          groupLoading: false,
        }));

        return true;
      } else {
        set(() => ({
          groupData: null,
          groupMessage: "Group key is required!",
          groupLoading: false,
        }));
        return false;
      }
    } catch (error) {
      console.error("Error deleting user group:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while deleting user group",
        groupLoading: false,
      }));
      return false;
    }
  },

  deleteAllGroups: async () => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const allGroups = await listDocs({
        collection: "groups",
      });

      const allUserGroups = await listDocs({
        collection: "userGroups",
      });

      const allGroupPendingMembers = await listDocs({
        collection: "groupPendingMembers",
      });

      for (const groupPendingMember of allGroupPendingMembers.items) {
        await deleteDoc({
          collection: "groupPendingMembers",
          doc: groupPendingMember,
        });

        console.log("Group pending members deleted successfully!");
      }

      for (const group of allGroups.items) {
        await deleteDoc({
          collection: "groups",
          doc: group,
        });

        console.log("Group deleted successfully!");
      }

      for (const userGroup of allUserGroups.items) {
        const userGroupData = await getDoc({
          collection: "userGroups",
          key: userGroup.key,
        });

        userGroupData.data.groups = [];

        await setDoc({
          collection: "userGroups",
          doc: {
            key: userGroupData.key,
            data: userGroupData.data,
            version: userGroupData.version,
          },
        });

        console.log("User group deleted successfully!");
      }
      set(() => ({
        groupData: null,
        groupMessage: "All groups deleted successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error deleting all groups:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while deleting all groups",
        groupLoading: false,
      }));
    }
  },

  getAvailableGroup: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const group = await getDoc({
        collection: "groups",
        key: formData.groupKey,
      });

      const groupPendingMember = await getDoc({
        collection: "groupPendingMembers",
        key: formData.groupKey,
      });

      const userAlreadyJoined = groupPendingMember.data.pendingMembers.some(
        (member) => member.userKey === formData.userKey
      );

      const groupInfo = {
        ...group.data,
        userJoinStatus: userAlreadyJoined,
      };

      set(() => ({
        groupData: groupInfo,
        groupMessage: "Group Info",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching available group for user:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while fetching all available group for user",
        groupLoading: false,
      }));
      return false;
    }
  },

  getAllAvailableGroups: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const groups = await listDocs({
        collection: "groups",
      });

      const userGroup = await getDoc({
        collection: "userGroups",
        key: formData.userKey,
      });

      const userGroupKeys = new Set(
        userGroup.data.groups.map((group) => group.key)
      );

      let availableGroups = [];

      for (const group of groups.items) {
        if (!userGroupKeys.has(group.key)) {
          const groupPendingMembers = await getDoc({
            collection: "groupPendingMembers",
            key: group.key,
          });

          let userAlreadyJoined = groupPendingMembers.data.pendingMembers.some(
            (pendingMember) => pendingMember.userKey === formData.userKey
          );

          const updatedGroupData = {
            ...group.data,
            userJoinStatus: userAlreadyJoined,
          };

          availableGroups.push(updatedGroupData);
        }
      }

      // Set state with the fetched groups
      set(() => ({
        groupData: availableGroups,
        groupMessage: "Available groups for user fetched successfully!",
        groupLoading: false,
      }));

      return true;
    } catch (error) {
      console.error("Error fetching available group for user:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while fetching all available group for user",
        groupLoading: false,
      }));
      return false;
    }
  },

  joinUserGroup: async (formData) => {
    set(() => ({
      groupLoading: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));
    try {
      const group = await getDoc({
        collection: "groups",
        key: formData.groupKey,
      });

      const groupPendingMembers = await getDoc({
        collection: "groupPendingMembers",
        key: group.key,
      });

      if (group && groupPendingMembers) {
        const user = await getDoc({
          collection: "users",
          key: formData.userKey,
        });

        const newPendingMember = {
          userKey: user.key,
          name: user.data.fullName,
          groupRole: "Group Member",
        };

        groupPendingMembers.data.pendingMembers.push(newPendingMember);

        await setDoc({
          collection: "groupPendingMembers",
          doc: {
            key: groupPendingMembers.key,
            data: groupPendingMembers.data,
            version: groupPendingMembers.version,
          },
        });
      }
      set(() => ({
        groupData: null,
        groupMessage: "User joined the group successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error joining user into the selected group:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while attempting to join user into the group",
        groupLoading: false,
      }));
      return false;
    }
  },

  userGroupPendingApproval: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const allGroups = await listDocs({
        collection: "groups",
      });

      let userOwnedGroupPendingMemberArray = [];
      for (const group of allGroups.items) {
        if (group.data.owner.key === formData.userKey) {
          const groupPendingMember = await getDoc({
            collection: "groupPendingMembers",
            key: group.key,
          });
          const updatedUserOwnedGroupInfo = {
            groupInfo: group.data,
            groupPendingMember: groupPendingMember,
            groupPendingMemberCount:
              groupPendingMember.data.pendingMembers.length,
          };
          userOwnedGroupPendingMemberArray.push(updatedUserOwnedGroupInfo);
        }
      }

      set(() => ({
        groupData: userOwnedGroupPendingMemberArray,
        groupMessage: "All user owned group fetched successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching all user owned group:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while fetching all user owned group",
        groupLoading: false,
      }));
      return false;
    }
  },

  groupPendingMembers: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const groupPendingMember = await getDoc({
        collection: "groupPendingMembers",
        key: formData.groupKey,
      });

      const pendingMembersArray = [];
      for (const pendingMember of groupPendingMember.data.pendingMembers) {
        const user = await getDoc({
          collection: "users",
          key: pendingMember.userKey,
        });

        if (user) {
          const data = {
            pendingMembers: groupPendingMember.data.pendingMembers,
            userInfo: user.data,
          };
          pendingMembersArray.push(data);
        }
      }

      set(() => ({
        groupData: pendingMembersArray,
        groupMessage: "Group Pending Members fetched successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error fetching group pending members:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while fetching group pending members",
        groupLoading: false,
      }));
      return false;
    }
  },

  approvePendingMember: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const groupPendingMember = await getDoc({
        collection: "groupPendingMembers",
        key: formData.groupPendingKey,
      });

      if (groupPendingMember) {
        let updatedPendingMemberArray = [];
        for (const pendingMember of groupPendingMember.data.pendingMembers) {
          if (pendingMember.userKey != formData.groupPendingMember.userKey) {
            updatedPendingMemberArray.push(pendingMember);
          }
        }

        groupPendingMember.data.pendingMembers = updatedPendingMemberArray;

        await setDoc({
          collection: "groupPendingMembers",
          doc: {
            key: groupPendingMember.key,
            data: groupPendingMember.data,
            version: groupPendingMember.version,
          },
        });
      } else {
        set(() => ({
          groupData: null,
          groupMessage: "Group Pending Member not found!",
          groupLoading: false,
        }));
        return false;
      }

      const group = await getDoc({
        collection: "groups",
        key: formData.groupPendingKey,
      });

      if (group) {
        const user = await getDoc({
          collection: "users",
          key: formData.groupPendingMember.userKey,
        });

        if (user) {
          group.data.members.push(user.data);
          group.data.membersCount = group.data.members.length;

          await setDoc({
            collection: "groups",
            doc: {
              key: group.key,
              data: group.data,
              version: group.version,
            },
          });

          const userGroup = await getDoc({
            collection: "userGroups",
            key: user.key,
          });

          if (userGroup) {
            const addUserGroup = {
              key: group.key,
              groupName: group.data.name,
            };

            userGroup.data.groups.push(addUserGroup);

            await setDoc({
              collection: "userGroups",
              doc: {
                key: userGroup.key,
                data: userGroup.data,
                version: userGroup.version,
              },
            });
          } else {
            set(() => ({
              groupData: null,
              groupMessage: "userGroup not found!",
              groupLoading: false,
            }));
          }
        } else {
          set(() => ({
            groupData: null,
            groupMessage: "User not found!",
            groupLoading: false,
          }));
          return false;
        }
        console.log("user successfully added to the group!");
      } else {
        set(() => ({
          groupData: null,
          groupMessage: "Group not found!",
          groupLoading: false,
        }));
        return false;
      }

      set(() => ({
        groupData: null,
        groupMessage: "User Approved Successfully",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error adding user to the group:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message || "An error occurred while adding user to the group",
        groupLoading: false,
      }));
      return false;
    }
  },

  rejectPendingMember: async (formData) => {
    set(() => ({
      groupData: null,
      groupMessage: "Loading...",
      groupLoading: true,
    }));

    try {
      const groupPendingMember = await getDoc({
        collection: "groupPendingMembers",
        key: formData.groupPendingKey,
      });

      if (groupPendingMember) {
        let updatedPendingMemberArray = [];
        for (const pendingMember of groupPendingMember.data.pendingMembers) {
          if (pendingMember.userKey != formData.groupPendingMember.userKey) {
            updatedPendingMemberArray.push(pendingMember);
          }
        }

        groupPendingMember.data.pendingMembers = updatedPendingMemberArray;

        await setDoc({
          collection: "groupPendingMembers",
          doc: {
            key: groupPendingMember.key,
            data: groupPendingMember.data,
            version: groupPendingMember.version,
          },
        });
      } else {
        set(() => ({
          groupData: null,
          groupMessage: "Group Pending Member not found!",
          groupLoading: false,
        }));
        return false;
      }

      set(() => ({
        groupData: null,
        groupMessage: "User Rejected Successfully!",
        groupLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error rejecting user approval from the group:", error);
      set(() => ({
        groupData: null,
        groupMessage:
          error.message ||
          "An error occurred while rejecting user approval to the group",
        groupLoading: false,
      }));
      return false;
    }
  },
}));

import React, { useEffect, useMemo, useState } from "react";
import {
  Title,
  Box,
  FileInput,
  Button,
  LoadingOverlay,
  Image,
  Group,
  Stack,
} from "@mantine/core";
import { useUsersStore } from "../store/users";
import { useAuthenticationStore } from "../store/authentication";
import { usePublicMaterials } from "../store/miscellaneous";
import { useGroupStore } from "../store/group";
import { usePostStore } from "../store/post";
import { useDiariesStore } from "../store/diary";
import { useShallow } from "zustand/shallow";
import { useForm } from "@mantine/form";
import { useNavigate, useLocation } from "react-router-dom";

export default function MiscellaneousPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasFetched, setHasFetched] = useState(false);

  const logoutUserFn = useAuthenticationStore(
    (state) => state.logoutInternetIdentity
  );
  const {
    data,
    message,
    loading,
    getUserInfoFn,
    getAllUsersFn,
    updateUserInfoFn,
    deleteUserInfoFn,
    deleteAllUsersFn,
    uploadPlaceHolderImageFn,
    getPlaceHolderProfileImagesFn,
    getAllUserActiveCompanionsFn,
  } = useUsersStore(
    useShallow((state) => ({
      data: state.data,
      message: state.message,
      loading: state.loading,
      getUserInfoFn: state.getUserInfo,
      getAllUsersFn: state.getAllUsers,
      updateUserInfoFn: state.updateUserInfo,
      deleteUserInfoFn: state.deleteUserInfo,
      deleteAllUsersFn: state.deleteAllUsers,
      uploadPlaceHolderImageFn: state.uploadPlaceHolderImage,
      getPlaceHolderProfileImagesFn: state.getPlaceHolderProfileImages,
      getAllUserActiveCompanionsFn: state.getAllUserActiveCompanions,
    }))
  );

  const {
    miscData,
    miscMessage,
    miscLoading,
    createCategoriesFn,
    getAllCategoriesFn,
    deleteCategoriesFn,
    createAnonymousNickamesFn,
    createAnonymousProfileFn,
    getAllAnonymousProfilesFn,
    deleteAnonymousFn,
  } = usePublicMaterials(
    useShallow((state) => ({
      miscData: state.miscData,
      miscMessage: state.miscMessage,
      miscLoading: state.miscLoading,
      createCategoriesFn: state.createCategories,
      getAllCategoriesFn: state.getAllCategories,
      deleteCategoriesFn: state.deleteCategories,
      createAnonymousNickamesFn: state.createAnonymousNickames,
      createAnonymousProfileFn: state.createAnonymousProfile,
      deleteAnonymousFn: state.deleteAnonymous,
      getAllAnonymousProfilesFn: state.getAllAnonymousProfiles,
    }))
  );

  const {
    groupData,
    groupMessage,
    groupLoading,
    publicGroupProfileFn,
    getAllPublicGroupProfilesFn,
    createGroupFn,
    getGroupFn,
    getAllGroupsFn,
    getUserGroupFn,
    editGroupInfoFn,
    removeMemberFn,
    deleteGroupFn,
    getAvailableGroupFn,
    getAllAvailableGroupsFn,
    joinUserGroupFn,
    userGroupPendingApprovalFn,
    groupPendingMembersFn,
    approvePendingMemberFn,
    rejectPendingMemberFn,
  } = useGroupStore(
    useShallow((state) => ({
      groupData: state.groupData,
      groupMessage: state.groupMessage,
      groupLoading: state.groupLoading,
      publicGroupProfileFn: state.publicGroupProfile,
      getAllPublicGroupProfilesFn: state.getAllPublicGroupProfiles,
      createGroupFn: state.createGroup,
      getGroupFn: state.getGroup,
      getAllGroupsFn: state.getAllGroups,
      getUserGroupFn: state.getUserGroup,
      editGroupInfoFn: state.editGroupInfo,
      removeMemberFn: state.removeMember,
      deleteGroupFn: state.deleteGroup,
      getAllAvailableGroupsFn: state.getAllAvailableGroups,
      joinUserGroupFn: state.joinUserGroup,
      userGroupPendingApprovalFn: state.userGroupPendingApproval,
      groupPendingMembersFn: state.groupPendingMembers,
      approvePendingMemberFn: state.approvePendingMember,
      rejectPendingMemberFn: state.rejectPendingMember,
      getAvailableGroupFn: state.getAvailableGroup,
    }))
  );

  const {
    postData,
    postMessage,
    postLoading,
    createTopicsFn,
    getAllTopicsFn,
    createHealthCareSuggestionsFn,
    getAllHealthCareSuggestionsFn,
    createPostFn,
    getAllUserPostsFn,
    deleteAllUserPostsFn,
  } = usePostStore(
    useShallow((state) => ({
      postData: state.postData,
      postMessage: state.postMessage,
      postLoading: state.postLoading,
      createTopicsFn: state.createTopics,
      getAllTopicsFn: state.getAllTopics,
      createHealthCareSuggestionsFn: state.createHealthCareSuggestions,
      getAllHealthCareSuggestionsFn: state.getAllHealthCareSuggestions,
      createPostFn: state.createPost,
      getAllUserPostsFn: state.getAllUserPosts,
      deleteAllUserPostsFn: state.deleteAllUserPosts,
    }))
  );

  const {
    diaryData,
    diaryMessage,
    diaryLoading,
    createThoughtsFn,
    getUserThoughtDiariesFn,
  } = useDiariesStore(
    useShallow((state) => ({
      diaryData: state.diaryData,
      diaryMessage: state.diaryMessage,
      diaryLoading: state.diaryLoading,
      createThoughtsFn: state.createThoughts,
      getUserThoughtDiariesFn: state.getUserThoughtDiaries,
    }))
  );

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // getUserInfoFn();
    // getAllUsersFn();

    if (location.pathname === "/miscellaneous" && !hasFetched) {
      getUserInfoFn();
      setHasFetched(true);
    }
  }, [
    data,
    message,
    loading,
    miscData,
    miscMessage,
    loading,
    groupData,
    groupMessage,
    groupLoading,
    location,
    getUserInfoFn,
    hasFetched,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (miscData) {
      console.log("Misc Data:", miscData);
    }
  }, [miscData]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      file: null,
    },
  });

  const handleGetUserInfo = async () => {
    try {
      const getSuccess = await getUserInfoFn();
      if (getSuccess) {
        console.log("User Info fetched successfully!", data);
      } else {
        console.error("Failed to fetched user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const getSuccess = await getAllUsersFn();
      if (getSuccess) {
        console.log("All User Info fetched successfully!", data);
      } else {
        console.error("Failed to fetched user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleDeleteUserInfo = async () => {
    try {
      const deleteSuccess = await deleteUserInfoFn();
      if (deleteSuccess) {
        console.log("All User Info fetched successfully!", data);
      } else {
        console.error("Failed to fetched user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const handleLogoutUser = async () => {
    const userKey = "Dzmq9BH6JPBLFMlknjBO7";
    try {
      const logoutSuccess = await logoutUserFn(userKey);
      if (logoutSuccess) {
        console.log("User logged out successfully!");
        return navigate("/login");
      } else {
        console.error("Failed to to logout user");
      }
    } catch (error) {
      console.error("Error executing logout on user:", error);
    }
  };

  const handleDeleteAllUsers = async () => {
    try {
      const deleteSuccess = await deleteAllUsersFn();
      if (deleteSuccess) {
        console.log("All User Info deleted successfully!", data);
      } else {
        console.error("Failed to delete user info");
      }
    } catch (error) {
      console.error("Error deleting user info:", error);
    }
  };

  const handleSubmitFile = async (values) => {
    const { file } = values;

    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsUploading(true);

    try {
      if (data) {
        const updateSuccess = await updateUserInfoFn(data, file);
        if (updateSuccess) {
          console.log("File uploaded and user info updated successfully!");
          getUserInfoFn(); // Fetch updated user info
        } else {
          console.error("Failed to update user info");
        }
      } else {
        console.error("No user data available");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadPlaceHolderImage = async (values) => {
    const { file } = values;
    try {
      const uploadSuccess = await uploadPlaceHolderImageFn(file);
      if (uploadSuccess) {
        console.log("Place holder image uploaded successfully!");
      } else {
        console.error("Failed to upload place holder image");
      }
    } catch (error) {
      console.error("Error uploading place holder image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetPlaceHolderProfileImages = async () => {
    try {
      const getSuccess = await getPlaceHolderProfileImagesFn();
      if (getSuccess) {
        console.log("All User Info fetched successfully!", data);
      } else {
        console.error("Failed to fetched user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleGetAllUserActiveCompanions = async () => {
    try {
      const getSuccess = await getAllUserActiveCompanionsFn();
      if (getSuccess) {
        console.log("All User Info fetched successfully!", data);
      } else {
        console.error("Failed to fetched user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // New blank handlers for the buttons
  const handleCreateCategories = async () => {
    try {
      const createSuccess = await createCategoriesFn();
      if (createSuccess) {
        console.log("All Categories created successfully!", miscData);
      } else {
        console.error("Failed to create all categories");
      }
    } catch (error) {
      console.error("Error creating all category files:", error);
    }
  };

  const handleGetCategories = async () => {
    try {
      const getSuccess = await getAllCategoriesFn();
      if (getSuccess) {
        console.log("All Categories fetched successfully!");
      } else {
        console.error("Failed to fetch all categories");
      }
    } catch (error) {
      console.error("Error fetching all category files:", error);
    }
  };

  const handleDeleteCategories = async () => {
    try {
      const deleteSuccess = await deleteCategoriesFn();
      if (deleteSuccess) {
        console.log("All Categories deleted successfully!", miscData);
      } else {
        console.error("Failed to delete all categories");
      }
    } catch (error) {
      console.error("Error deleting all category files:", error);
    }
  };
  const handleCreateAnonymousNickname = async () => {};

  const handleCreateAnonymousProfile = async (values) => {
    const { file } = values;

    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsUploading(true);

    try {
      const uploadSuccess = await createAnonymousProfileFn(file);
      if (uploadSuccess) {
        console.log("File uploaded successfully!");
        getAllAnonymousProfilesFn(); // Fetch updated user info
      } else {
        console.error("Failed to upload anonymous profile");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAnonymousProfiles = async () => {
    try {
      const getSuccess = await getAllAnonymousProfilesFn();
      if (getSuccess) {
        console.log("All Anonymous Profile fetched successfully!", miscData);
      } else {
        console.error("Failed to fetch all Anonymous Profile");
      }
    } catch (error) {
      console.error("Error fetching all Anonymous Profile files:", error);
    }
  };

  const handleDeleteAnonymous = async () => {
    try {
      const deleteSuccess = await deleteAnonymousFn();
      if (deleteSuccess) {
        console.log("All Anonymous Profile deleted successfully!", miscData);
      } else {
        console.error("Failed to delete all anonymous profiles");
      }
    } catch (error) {
      console.error("Error deleting all Anonymous Profile files:", error);
    }
  };

  const handlePublicGroupProfile = async (values) => {
    const { file } = values;

    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsUploading(true);

    try {
      const uploadSuccess = await publicGroupProfileFn(file);
      if (uploadSuccess) {
        console.log("File uploaded successfully!");
        await getAllPublicGroupProfilesFn(); // Fetch updated user info
      } else {
        console.error("Failed to upload public group profile");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleGetAllPublicGroupProfile = async () => {
    try {
      const uploadSuccess = await getAllPublicGroupProfilesFn();
      if (uploadSuccess) {
        console.log("All Available Public Group Profiles", groupData);
        await getAllPublicGroupProfilesFn();
      } else {
        console.error("Failed to upload public group profile");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleCreateGroup = async () => {
    const formData = {
      ownerKey: "3JkiWUaMis6ziIHwRrKsK",
      groupProfilePath:
        "http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/groupProfileCollections/78NrInBvKoD2RcGJDMkik-profile",
      name: "Mga Kupal lang pwede VERSION 4",
      description:
        "I believe in creating a safe, non-judgmental space where you can freely express your thoughts and emotions without fear of being misunderstood. Everyone deserves a place where they feel heard, supported, and validated. My goal is to be that person who listens with compassion and helps you navigate the challenges you're facing. Together, we can work on finding practical solutions, building coping strategies, and restoring a sense of balance and peace in your life. Your mental well-being matters, and I’m here to support you every step of the way, helping you feel more grounded, empowered, and at ease.",
      categories: [
        { key: "0odu3GeKNm23ktO-ZsGZh" },
        { key: "-KcF2Q4_WHaJCMTlyuxGV" },
        { key: "9AcEugJNN1MfkT9WEhbfj" },
      ],
      members: [
        {
          fullName: "Super Admin",
          key: "3JkiWUaMis6ziIHwRrKsK",
          lastUpdated: "2024-10-18T13:49:08.847Z",
          role: "super-admin",
          status: "online",
          groupRole: "Group Admin",
        },
        // {
        //   fullName: "alex",
        //   key: "TslCus6H3Dzc1w6kD9GEr",
        //   lastUpdated: "2024-10-18T13:51:22.079Z",
        //   role: "EaseBuddy",
        //   status: "online",
        //   groupRole: "member",
        // },
        // {
        //   fullName: "alex1",
        //   key: "KV_NQMbT7TDrCru7ZpUlH",
        //   lastUpdated: "2024-10-18T13:55:51.094Z",
        //   role: "EaseBuddy",
        //   status: "offline",
        //   groupRole: "member",
        // },
      ],
    };
    try {
      const creatSuccess = await createGroupFn(formData);
      if (creatSuccess) {
        console.log("Group Created Successfully!");
        await getAllGroupsFn();
      } else {
        console.error("Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleGetGroup = async () => {
    const formData = {
      groupKey: "KuldakKe0997u0w2f2z3W",
    };
    try {
      const getSuccess = await getGroupFn(formData);
      if (getSuccess) {
        console.log("Group Fetched Successfully!", groupData);
      } else {
        console.error("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAvailableGroup = async () => {
    const formData = {
      groupKey: "jkBOyprLvU1RA9wZz0tgU",
      userKey: "v1DNhZd_vhjIEMLEcFM4z",
    };
    try {
      const getSuccess = await getAvailableGroupFn(formData);
      if (getSuccess) {
        console.log("Available Group Fetched Successfully!", groupData);
      } else {
        console.error("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllGroups = async () => {
    try {
      const getSuccess = await getAllGroupsFn();
      if (getSuccess) {
        console.log("All Groups Fetched Successfully!");
        console.log("All Groups: ", groupData);
      } else {
        console.error("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleGetUserGroup = async () => {
    const formData = {
      userKey: "Kc-vC3qsRa5uHYnuDErS9",
    };
    try {
      const getSuccess = await getUserGroupFn(formData);
      if (getSuccess) {
        console.log("All Groups Fetched Successfully!");
        // await getUserGroupFn(formData);
        console.log("All Groups: ", groupData);
      } else {
        console.error("Failed to fetch groups");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditGroupInfo = async () => {
    const formData = {
      groupKey: "O7MsnLtswxeu6YltUr_fA",
      updatedGroupInfo: {
        ownerKey: "3JkiWUaMis6ziIHwRrKsK",
        groupProfilePath:
          "http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/groupProfileCollections/78NrInBvKoD2RcGJDMkik-profile",
        name: "Kupal V2",
        description:
          "I believe in creating a safe, non-judgmental space where you can freely express your thoughts and emotions without fear of being misunderstood. Everyone deserves a place where they feel heard, supported, and validated. My goal is to be that person who listens with compassion and helps you navigate the challenges you're facing. Together, we can work on finding practical solutions, building coping strategies, and restoring a sense of balance and peace in your life. Your mental well-being matters, and I’m here to support you every step of the way, helping you feel more grounded, empowered, and at ease.",
        categories: [
          { key: "-T36JdCXUPGa6Y3SWnNa7" },
          { key: "1ybG2xJ7KlrrJvqMMegWd" },
          { key: "BkzJ9rX2qi5gyXJYE5WOF" },
        ],
        newAddedMembers: [
          {
            fullName: "alex1",
            key: "KV_NQMbT7TDrCru7ZpUlH",
            lastUpdated: "2024-10-18T13:51:22.079Z",
            role: "EaseBuddy",
            status: "online",
            groupRole: "member",
          },
          // {
          //   fullName: "alex1",
          //   key: "v1DNhZd_vhjIEMLEcFM4z",
          //   lastUpdated: "2024-10-18T13:55:51.094Z",
          //   role: "EaseBuddy",
          //   status: "offline",
          //   groupRole: "member",
          // },
        ],
      },
    };

    try {
      const editSuccess = await editGroupInfoFn(formData);
      if (editSuccess) {
        console.log("User has been removed on the group successfully!");
      } else {
        console.error("Failed to remove user from the group");
      }
    } catch (error) {
      console.error("Error removing user from the group:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveMember = async () => {
    const formData = {
      groupKey: "jkBOyprLvU1RA9wZz0tgU",
      userKey: "v1DNhZd_vhjIEMLEcFM4z",
    };

    try {
      const removeSuccess = await removeMemberFn(formData);
      if (removeSuccess) {
        console.log("User has been removed on the group successfully!");
      } else {
        console.error("Failed to remove user from the group");
      }
    } catch (error) {
      console.error("Error removing user from the group:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleDeleteGroup = async () => {
    const formData = {
      groupKey: "e163XMKdWgtwKMPAlesle",
    };

    try {
      const deleteSuccess = await deleteGroupFn(formData);
      if (deleteSuccess) {
        console.log("User Group deleted successfully!");
      } else {
        console.error("Failed to delete user group");
      }
    } catch (error) {
      console.error("Error deleting user group:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllAvailableGroups = async () => {
    const formData = {
      userKey: "v1DNhZd_vhjIEMLEcFM4z",
    };
    try {
      const getSuccess = await getAllAvailableGroupsFn(formData);
      if (getSuccess) {
        console.log("All available groups fetched successfully!", groupData);
      } else {
        console.error("Failed to fetched all available groups");
      }
    } catch (error) {
      console.error("Error fetching all available groups:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleJoinUserGroup = async () => {
    const formData = {
      groupKey: "CyUfJ48snB17Wb5fm9FdE",
      userKey: "v1DNhZd_vhjIEMLEcFM4z",
    };
    try {
      const joinSuccess = await joinUserGroupFn(formData);
      if (joinSuccess) {
        console.log(
          "User joined successfully and waiting for approval!",
          groupData
        );
      } else {
        console.error("Failed to join groups");
      }
    } catch (error) {
      console.error("Error joining user to the group:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUserGroupPendingApproval = async () => {
    const formData = {
      userKey: "Kc-vC3qsRa5uHYnuDErS9",
    };
    try {
      const getSuccess = await userGroupPendingApprovalFn(formData);
      if (getSuccess) {
        console.log("All user owned groups fetched successfully!", groupData);
      } else {
        console.error("Failed to fetch all user owned groups.");
      }
    } catch (error) {
      console.error("Error fetching all user owned groups:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGroupPendingMembers = async () => {
    const formData = {
      groupKey: "CyUfJ48snB17Wb5fm9FdE",
    };
    try {
      const getSuccess = await groupPendingMembersFn(formData);
      if (getSuccess) {
        console.log("Group Pending Members fetched successfully!", groupData);
      } else {
        console.error("Failed to fetch group pending members");
      }
    } catch (error) {
      console.error("Error fetching group pending members:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleApprovePendingMember = async () => {
    const formData = {
      groupPendingKey: "CyUfJ48snB17Wb5fm9FdE",
      groupPendingMember: {
        groupRole: "Group Member",
        name: "alex1",
        userKey: "v1DNhZd_vhjIEMLEcFM4z",
      },
    };

    try {
      const approveSuccess = await approvePendingMemberFn(formData);
      if (approveSuccess) {
        console.log("User Approved successfully!", groupData);
      } else {
        console.error("Failed to approve user from group", groupMessage);
      }
    } catch (error) {
      console.error("Error approving user from group:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRejectPendingMember = async () => {
    const formData = {
      groupPendingKey: "jkBOyprLvU1RA9wZz0tgU",
      groupPendingMember: {
        groupRole: "member",
        name: "alex1",
        userKey: "v1DNhZd_vhjIEMLEcFM4z",
      },
    };
    try {
      const rejectSuccess = await rejectPendingMemberFn(formData);
      if (rejectSuccess) {
        console.log("User approval rejected successfully!");
      } else {
        console.error("Failed reject user from the group.");
      }
    } catch (error) {
      console.error("Error rejecting approval of user:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateTopics = async () => {
    try {
      const createSuccess = await createTopicsFn();
      if (createSuccess) {
        console.log("Topics seeded successfully!");
      } else {
        console.error("Failed to seed topics");
      }
    } catch (error) {
      console.error("Error seeding topics:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllTopics = async () => {
    try {
      const getSuccess = await getAllTopicsFn();
      if (getSuccess) {
        console.log("All topics fetched successfully!", postData);
      } else {
        console.error("Failed to fetch all topics");
      }
    } catch (error) {
      console.error("Error fetching all topics:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateHealthCareSuggestions = async () => {
    try {
      const createSuccess = await createHealthCareSuggestionsFn();
      if (createSuccess) {
        console.log("Health care suggestions seeded successfully!", postData);
      } else {
        console.error("Failed to seed all health care suggestions");
      }
    } catch (error) {
      console.error("Error seeding all health care suggestions:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllHealthCareSuggestions = async () => {
    try {
      const getSuccess = await getAllHealthCareSuggestionsFn();
      if (getSuccess) {
        console.log("Health care suggestions fetched successfully!", postData);
      } else {
        console.error("Failed to fetch all health care suggestions");
      }
    } catch (error) {
      console.error("Error fetching all health care suggestions:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreatePost = async (values) => {
    const { file } = values;
    const formData1 = {
      user: {
        fullName: "Super Admin",
        key: "3JkiWUaMis6ziIHwRrKsK",
        lastUpdated: "2024-10-17T07:06:36.176Z",
        profileImageUrl:
          "http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/userProfilePicture/3JkiWUaMis6ziIHwRrKsK-profile",
        role: "super-admin",
        status: "online",
      },
      title:
        "Anxiety is temporary, and so are tough times. You have the strength to overcome.",
      description:
        "Anxiety is temporary, and so are tough times. You have the strength to overcome. Remember to breathe, take breaks, and reach out when you need support. Anxiety is temporary, and so are tough times. You have the strength to overcome. Remember to breathe, take breaks, and reach out when you need support. Anxiety is temporary, and so are tough times. You have the strength to overcome. Remember to breathe, take breaks, and reach out when you need support.",
      topics: [
        { key: "QZH3RM_hPBn1UDFchSe3l", name: "Anxiety" },
        { key: "hskFMOgocfBaoeIJUg8-L", name: "Anxiety Relief" },
      ],
    };

    const formData2 = {
      user: {
        fullName: "Super Admin",
        key: "3JkiWUaMis6ziIHwRrKsK",
        lastUpdated: "2024-10-17T07:06:36.176Z",
        profileImageUrl:
          "http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/userProfilePicture/3JkiWUaMis6ziIHwRrKsK-profile",
        role: "super-admin",
        status: "online",
      },
      title: "Self-care isn’t selfish; it’s essential. Prioritize your needs.",
      description:
        "Self-care isn’t selfish; it’s essential. Prioritize your needs. Remember to make time for yourself, nurture your mental health, and practice habits that bring you peace. Self-care isn’t selfish; it’s essential. Prioritize your needs. Remember to make time for yourself, nurture your mental health, and practice habits that bring you peace. Self-care isn’t selfish; it’s essential. Prioritize your needs. Remember to make time for yourself, nurture your mental health, and practice habits that bring you peace.",
      topics: [
        { key: "mfcmFeTJ4sUEOviF5d1Bb", name: "Self Care" },
        { key: "5Puaks8iUShEIpbRd5KQg", name: "Mindfulness" },
      ],
    };

    const formData3 = {
      user: {
        fullName: "Super Admin",
        key: "3JkiWUaMis6ziIHwRrKsK",
        lastUpdated: "2024-10-17T07:06:36.176Z",
        profileImageUrl:
          "http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/userProfilePicture/3JkiWUaMis6ziIHwRrKsK-profile",
        role: "super-admin",
        status: "online",
      },
      title:
        "Healing is a journey, not a destination. Take it one day at a time.",
      description:
        "Healing is a journey, not a destination. Take it one day at a time. Be gentle with yourself and allow your mind and heart to rest when needed. Healing is a journey, not a destination. Take it one day at a time. Be gentle with yourself and allow your mind and heart to rest when needed. Healing is a journey, not a destination. Take it one day at a time. Be gentle with yourself and allow your mind and heart to rest when needed.",
      topics: [
        { key: "Z4GS2HBoYVWKfg0O402Y9", name: "Healing Journey" },
        { key: "JvEBDizXvmCKJEt2XT5c2", name: "Therapy Is Cool" },
      ],
    };

    try {
      const createSuccess = await createPostFn(formData3, file);
      if (createSuccess) {
        console.log("Post created successfully!");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllUserPosts = async () => {
    try {
      const getSuccess = await getAllUserPostsFn();
      if (getSuccess) {
        console.log("All User Post fetched successfully!", postData);
      } else {
        console.error("Failed to fetch all user post");
      }
    } catch (error) {
      console.error("Error fetching all user post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAllUserPosts = async () => {
    try {
      const deleteSuccess = await deleteAllUserPostsFn();
      if (deleteSuccess) {
        console.log("All User Post deleted successfully!");
      } else {
        console.error("Failed to delete all user post");
      }
    } catch (error) {
      console.error("Error deleting all user post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateThoughts = async (values) => {
    const { files } = values;
    const formData = {
      userKey: "Kc-vC3qsRa5uHYnuDErS9",
      thoughtDiaryInfo: {
        title: "My Thoughts Diary",
        description: "This is a diary of my thoughts and feelings.",
      },
    };

    try {
      const createSuccess = await createThoughtsFn(formData, files);
      if (createSuccess) {
        console.log("User thoughts diary created successfully!");
      } else {
        console.error("Failed to create user thoughts diary");
      }
    } catch (error) {
      console.error("Error creating user thoughts:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetUserThoughtDiaries = async () => {
    const formData = {
      userKey: "Kc-vC3qsRa5uHYnuDErS9",
    };

    try {
      const getSuccess = await getUserThoughtDiariesFn(formData);
      if (getSuccess) {
        console.log("User thoughts diary fetched successfully!", diaryData);
      } else {
        console.error("Failed to fetch user thoughts diary");
      }
    } catch (error) {
      console.error("Error fetching user thoughts:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box position="relative">
      <LoadingOverlay visible={isUploading || loading} overlayBlur={2} />
      <Title>Miscellaneous Alternative CMS for Juno</Title>

      <Title order={2} mt="xl">
        User
      </Title>
      <Group mt="md">
        <Button onClick={handleGetUserInfo} loading={loading}>
          Get User Info
        </Button>
        <Button onClick={handleGetAllUsers} loading={loading}>
          Get All Users
        </Button>
        <Button onClick={handleDeleteUserInfo} loading={loading}>
          Delete User
        </Button>
        <Button onClick={handleLogoutUser} loading={loading}>
          Log Out
        </Button>
        <Button onClick={handleDeleteAllUsers} loading={loading}>
          Delete All Users
        </Button>
        <Button onClick={handleGetPlaceHolderProfileImages} loading={loading}>
          Get Placeholder Profiles
        </Button>
        <Button onClick={handleGetAllUserActiveCompanions} loading={loading}>
          Get All Active Companions
        </Button>
      </Group>

      <Title order={2} mt="xl">
        Upload Placeholder Profile
      </Title>
      <form onSubmit={form.onSubmit(handleUploadPlaceHolderImage)}>
        <FileInput
          label="Upload file here"
          {...form.getInputProps("file")}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={diaryLoading}>
          {isUploading ? "Uploading..." : "Upload Placeholder Profile"}
        </Button>
      </form>
      {message && <p>{message}</p>}

      <Title order={2} mt="xl">
        Upload User Profile
      </Title>
      {data &&
        data.userCredentials &&
        data.userCredentials.data &&
        data.userCredentials.data.profileImageUrl && (
          <Box mt="md">
            <Title order={4}>Profile Image:</Title>
            <Image
              src={data.userCredentials.data.profileImageUrl}
              alt="Profile"
              width={200}
              height={200}
              fit="contain"
              withPlaceholder
            />
          </Box>
        )}

      <form onSubmit={form.onSubmit(handleSubmitFile)}>
        <FileInput
          label="Upload file here"
          {...form.getInputProps("file")}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={isUploading}>
          {isUploading ? "Uploading..." : "Submit"}
        </Button>
      </form>
      {message && <p>{message}</p>}

      <Title order={2} mt="xl">
        Miscellaneous Buttons
      </Title>
      <Group mt="md">
        <Button onClick={handleCreateCategories} loading={miscLoading}>
          Create categories
        </Button>
        <Button onClick={handleGetCategories} loading={miscLoading}>
          Get All Categories
        </Button>
        <Button onClick={handleDeleteCategories} loading={miscLoading}>
          Delete Categories
        </Button>
        <Button onClick={handleCreateAnonymousNickname} loading={miscLoading}>
          Create Anonymous Nickname
        </Button>
        <Button onClick={handleGetAnonymousProfiles} loading={miscLoading}>
          Get Anonymous Profiles
        </Button>
        <Button onClick={handleDeleteAnonymous} loading={miscLoading}>
          Delete Anonymous
        </Button>
      </Group>

      <Title order={2} mt="xl">
        Upload Anonymous Profiles
      </Title>
      {/* This is for uploading Anonymous Profiles */}
      <form onSubmit={form.onSubmit(handleCreateAnonymousProfile)}>
        <FileInput
          label="Upload file here"
          {...form.getInputProps("file")}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={isUploading}>
          {isUploading ? "Uploading..." : "Create Anonymous Profile"}
        </Button>
      </form>
      {message && <p>{message}</p>}

      <Title order={2} mt="xl">
        Groups Buttons
      </Title>
      <Group mt="md">
        <Button onClick={handleGetAllPublicGroupProfile} loading={groupLoading}>
          Get All Public Group Profile
        </Button>
        <Button onClick={handleCreateGroup} loading={groupLoading}>
          Create Group
        </Button>
        <Button onClick={handleGetGroup} loading={groupLoading}>
          Get Groups
        </Button>
        <Button onClick={handleGetAvailableGroup} loading={groupLoading}>
          Get Available Group
        </Button>
        <Button onClick={handleGetAllGroups} loading={groupLoading}>
          Get All Groups
        </Button>
        <Button onClick={handleGetUserGroup} loading={groupLoading}>
          Get User Group
        </Button>
        <Button onClick={handleEditGroupInfo} loading={groupLoading}>
          Edit Group Info
        </Button>
        <Button onClick={handleRemoveMember} loading={groupLoading}>
          Remove Member
        </Button>
        <Button onClick={handleDeleteGroup} loading={groupLoading}>
          Delete Group
        </Button>
        <Button onClick={handleGetAllAvailableGroups} loading={groupLoading}>
          View Available Group
        </Button>
        <Button onClick={handleJoinUserGroup} loading={groupLoading}>
          Join Group
        </Button>
        <Button onClick={handleUserGroupPendingApproval} loading={groupLoading}>
          Get User Owned Group Pending Approval
        </Button>
        <Button onClick={handleGroupPendingMembers} loading={groupLoading}>
          Group Pending Members
        </Button>
        <Button onClick={handleApprovePendingMember} loading={groupLoading}>
          Approve User
        </Button>
        <Button onClick={handleRejectPendingMember} loading={groupLoading}>
          Reject User
        </Button>
      </Group>

      <Title order={2} mt="xl">
        Upload Public Group Profiles
      </Title>
      <form onSubmit={form.onSubmit(handlePublicGroupProfile)}>
        <FileInput
          label="Upload file here"
          {...form.getInputProps("file")}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={isUploading}>
          {isUploading ? "Uploading..." : "Create Public Group Profile"}
        </Button>
      </form>
      {message && <p>{message}</p>}

      <Title order={2} mt="xl">
        Topics Buttons
      </Title>
      <Group mt="md">
        <Button onClick={handleCreateTopics} loading={postLoading}>
          Create Topics
        </Button>
        <Button onClick={handleGetAllTopics} loading={postLoading}>
          Get All Topics
        </Button>
      </Group>

      <Title order={2} mt="xl">
        Health Care Suggestion Buttons
      </Title>
      <Group mt="md">
        <Button
          onClick={handleCreateHealthCareSuggestions}
          loading={postLoading}
        >
          Create Health Care Suggestions
        </Button>
        <Button
          onClick={handleGetAllHealthCareSuggestions}
          loading={postLoading}
        >
          Get All Health Care Suggestions
        </Button>
      </Group>

      <Title order={2} mt="xl">
        Post Buttons
      </Title>
      <Group mt="md">
        <Button onClick={handleGetAllUserPosts} loading={postLoading}>
          Get All User Posts
        </Button>
        <Button onClick={handleDeleteAllUserPosts} loading={postLoading}>
          Delete All User Posts
        </Button>
      </Group>

      <Title order={2} mt="xl">
        Diary Buttons
      </Title>
      <Group mt="md">
        <Button onClick={handleCreateThoughts} loading={diaryLoading}>
          Create Thoughts
        </Button>
        <Button onClick={handleGetUserThoughtDiaries} loading={diaryLoading}>
          Get User Thought Diaries
        </Button>
      </Group>
      <form onSubmit={form.onSubmit(handleCreateThoughts)}>
        <FileInput
          label="Upload file here"
          multiple
          {...form.getInputProps("files")}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={diaryLoading}>
          {isUploading ? "Uploading..." : "Create Thoughts Diary"}
        </Button>
      </form>
      {message && <p>{message}</p>}
    </Box>
  );
}

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
import { useGroup } from "../store/group";
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
  } = useUsersStore(
    useShallow((state) => ({
      data: state.data,
      message: state.message,
      loading: state.loading,
      getUserInfoFn: state.getUserInfo,
      getAllUsersFn: state.getAllUsers,
      updateUserInfoFn: state.updateUserInfo,
      deleteUserInfoFn: state.deleteUserInfo,
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
    removeMemberFn,
  } = useGroup(
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
      removeMemberFn: state.removeMember,
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
    console.log(data);
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
      ownerKey: "8hf6nBFEWynuXUdVLTFay",
      groupProfilePath:
        "http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/groupProfileCollections/wJpIYti4tOGB_CgJkNVqP-profile",
      name: "Mga Feeling Depressed",
      description:
        "I believe in creating a safe, non-judgmental space where you can freely express your thoughts and emotions without fear of being misunderstood. Everyone deserves a place where they feel heard, supported, and validated. My goal is to be that person who listens with compassion and helps you navigate the challenges you're facing. Together, we can work on finding practical solutions, building coping strategies, and restoring a sense of balance and peace in your life. Your mental well-being matters, and I’m here to support you every step of the way, helping you feel more grounded, empowered, and at ease.",
      categories: [
        { key: "6YvpSvYYFyHjp6z7UBDff" },
        { key: "1vq2KGoLu8jzXPJnz0-kq" },
        { key: "HpT60sXah30yH7Ga1g_kq" },
      ],
      members: [
        {
          fullName: "Super Admin",
          key: "Dzmq9BH6JPBLFMlknjBO7",
          lastUpdated: "2024-10-16T10:41:06.710Z",
          role: "super-admin",
          status: "online",
        },
        {
          fullName: "alex",
          key: "uOl9RnXouVl9vU1fbUXU1",
          lastUpdated: "2024-10-16T10:30:00.901Z",
          role: "user",
          status: "online",
        },
        {
          fullName: "alex1",
          key: "vJL1OEHA9SzhDt21li-0r",
          lastUpdated: "2024-10-16T10:33:29.627Z",
          role: "user",
          status: "online",
        },
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
    try {
      const getSuccess = await getGroupFn();
      if (getSuccess) {
        console.log("All Groups Fetched Successfully!");
        await getGroupFn();
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
        await getAllGroupsFn();
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
      userKey: "Dzmq9BH6JPBLFMlknjBO7",
    };
    try {
      const getSuccess = await getUserGroupFn(formData);
      if (getSuccess) {
        console.log("All Groups Fetched Successfully!");
        await getAllGroupsFn();
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
  const handleRemoveMember = async () => {};

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
      </Group>

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
        Groups Button
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
        <Button onClick={handleGetAllGroups} loading={groupLoading}>
          Get All Groups
        </Button>
        <Button onClick={handleGetUserGroup} loading={groupLoading}>
          Get User Group
        </Button>
        <Button onClick={handleRemoveMember} loading={groupLoading}>
          Remove Member
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
    </Box>
  );
}

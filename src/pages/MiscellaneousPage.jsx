import React, { useEffect, useState } from 'react';
import {
  Title,
  Box,
  FileInput,
  Button,
  LoadingOverlay,
  Image,
  Group,
  Stack,
} from '@mantine/core';
import { useUsersStore } from '../store/users';
import { usePublicMaterials } from '../store/miscellaneous';
import { useGroup } from '../store/group';
import { useShallow } from 'zustand/shallow';
import { useForm } from '@mantine/form';

export default function MiscellaneousPage() {
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
    deleteAnonymousFn 
  } = usePublicMaterials(
    useShallow((state) => ({
    miscData: state.data,
    miscMessage: state.message,
    miscLoading: state.loading,
    createCategoriesFn: state.createCategories,
    getAllCategoriesFn: state.getAllCategories,
    deleteCategoriesFn: state.deleteCategories,
    createAnonymousNickamesFn: state.createAnonymousNickames,
    createAnonymousProfileFn: state.createAnonymousProfile,
    deleteAnonymousFn: state.deleteAnonymous,
  })));

  const { 
    groupData, 
    groupMessage, 
    groupLoading, 
    publicGroupProfileFn,
    getAllPublicGroupProfilesFn,
    createGroupFn,
    getGroupsFn,
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
    getGroupsFn: state.getGroups,
    getUserGroupFn: state.getUserGroup,
    removeMemberFn: state.removeMember,
  })));

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // getUserInfoFn();
  }, [data, message]); // eslint-disable-line react-hooks/exhaustive-deps

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      file: null,
    },
  });

  const handleSubmitFile = async (values) => {
    const { file } = values;

    if (!file) {
      console.error('No file selected');
      return;
    }

    setIsUploading(true);

    try {
      if (data) {
        const updateSuccess = await updateUserInfoFn(data, file);
        if (updateSuccess) {
          console.log('File uploaded and user info updated successfully!');
          getUserInfoFn(); // Fetch updated user info
        } else {
          console.error('Failed to update user info');
        }
      } else {
        console.error('No user data available');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // New blank handlers for the buttons
  const handleCreateCategories = async () => {
    try {
      const createSuccess = await createCategoriesFn();
      if (createSuccess) {
        console.log('All Categories created successfully!', miscData);

      } else {
        console.error('Failed to create all categories');
      }
  } catch (error) {
    console.error('Error creating all category files:', error);
  }
  };

  const handleGetCategories = async () => {
    try {
        const getSuccess = await getAllCategoriesFn();
        if (getSuccess) {
          console.log('All Categories fetched successfully!', miscData);
        } else {
          console.error('Failed to fetch all categories');
        }
    } catch (error) {
      console.error('Error fetching all category files:', error);
    }
  };

  const handleDeleteCategories = async () => {
    
    try {
      const deleteSuccess = await deleteCategoriesFn();
      if (deleteSuccess) {
        console.log('All Categories deleted successfully!', miscData);
      } else {
        console.error('Failed to delete all categories');
      }
  } catch (error) {
    console.error('Error deleting all category files:', error);
  }
  };
  const handleCreateAnonymousNickname = async () => {};
  const handleCreateAnonymousProfile = async () => {};
  const handleDeleteAnonymous = async () => {};

  const handlePublicGroupProfile = async () => {};
  const handleGetAllPublicGroupProfile = async () => {};
  const handleCreateGroup = async () => {};
  const handleGetGroups = async () => {};
  const handleGetUserGroup = async () => {};
  const handleRemoveMember = async () => {};

  return (
    <Box position="relative">
      <LoadingOverlay visible={isUploading || loading} overlayBlur={2} />
      <Title>Home Page</Title>

      {data && data.userCredentials && data.userCredentials.data && data.userCredentials.data.profileImageUrl && (
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
          {...form.getInputProps('file')}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={isUploading}>
          {isUploading ? 'Uploading...' : 'Submit'}
        </Button>
      </form>
      {message && <p>{message}</p>}

      <Title order={2} mt="xl">Miscellaneous Buttons</Title>
      <Group mt="md">
        <Button onClick={handleCreateCategories} loading={miscLoading}>Create categories</Button>
        <Button onClick={handleGetCategories} loading={miscLoading}>Get All Categories</Button>
        <Button onClick={handleDeleteCategories} loading={miscLoading}>Delete Categories</Button>
        <Button onClick={handleCreateAnonymousNickname} loading={miscLoading}>Create Anonymous Nickname</Button>
        <Button onClick={handleCreateAnonymousProfile} loading={miscLoading}>Create Anonymous Profile</Button>
        <Button onClick={handleDeleteAnonymous} loading={miscLoading}>Delete Anonymous</Button>
      </Group>

      <Title order={2} mt="xl">Groups Button</Title>
      <Group mt="md">
        <Button onClick={handlePublicGroupProfile} loading={groupLoading}>Public Group Profile</Button>
        <Button onClick={handleGetAllPublicGroupProfile} loading={groupLoading}>Get All Public Group Profile</Button>
        <Button onClick={handleCreateGroup} loading={groupLoading}>Create Group</Button>
        <Button onClick={handleGetGroups} loading={groupLoading}>Get Groups</Button>
        <Button onClick={handleGetUserGroup} loading={groupLoading}>Get User Group</Button>
        <Button onClick={handleRemoveMember} loading={groupLoading}>Remove Member</Button>
      </Group>
    </Box>
  );
}
import React, { useEffect, useMemo, useState } from 'react';
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
import { useAuthenticationStore } from '../store/authentication';
import { usePublicMaterials } from '../store/miscellaneous';
import { useGroupStore } from '../store/group';
import { usePostStore } from '../store/post';
import { useShallow } from 'zustand/shallow';
import { useForm } from '@mantine/form';
import { useNavigate, useLocation } from 'react-router-dom';

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
    deleteUserGroupFn,
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
      removeMemberFn: state.removeMember,
      deleteUserGroupFn: state.deleteUserGroup,
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

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // getUserInfoFn();
    // getAllUsersFn();

    if (location.pathname === '/miscellaneous' && !hasFetched) {
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
      console.log('Misc Data:', miscData);
    }
  }, [miscData]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      file: null,
    },
  });

  const handleGetUserInfo = async () => {
    try {
      const getSuccess = await getUserInfoFn();
      if (getSuccess) {
        console.log('User Info fetched successfully!', data);
      } else {
        console.error('Failed to fetched user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const getSuccess = await getAllUsersFn();
      if (getSuccess) {
        console.log('All User Info fetched successfully!', data);
      } else {
        console.error('Failed to fetched user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleDeleteUserInfo = async () => {
    try {
      const deleteSuccess = await deleteUserInfoFn();
      if (deleteSuccess) {
        console.log('All User Info fetched successfully!', data);
      } else {
        console.error('Failed to fetched user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  const handleLogoutUser = async () => {
    const userKey = 'Dzmq9BH6JPBLFMlknjBO7';
    try {
      const logoutSuccess = await logoutUserFn(userKey);
      if (logoutSuccess) {
        console.log('User logged out successfully!');
        return navigate('/login');
      } else {
        console.error('Failed to to logout user');
      }
    } catch (error) {
      console.error('Error executing logout on user:', error);
    }
  };

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
        console.log('All Categories fetched successfully!');
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

  const handleCreateAnonymousProfile = async (values) => {
    const { file } = values;

    if (!file) {
      console.error('No file selected');
      return;
    }

    setIsUploading(true);

    try {
      const uploadSuccess = await createAnonymousProfileFn(file);
      if (uploadSuccess) {
        console.log('File uploaded successfully!');
        getAllAnonymousProfilesFn(); // Fetch updated user info
      } else {
        console.error('Failed to upload anonymous profile');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAnonymousProfiles = async () => {
    try {
      const getSuccess = await getAllAnonymousProfilesFn();
      if (getSuccess) {
        console.log('All Anonymous Profile fetched successfully!', miscData);
      } else {
        console.error('Failed to fetch all Anonymous Profile');
      }
    } catch (error) {
      console.error('Error fetching all Anonymous Profile files:', error);
    }
  };

  const handleDeleteAnonymous = async () => {
    try {
      const deleteSuccess = await deleteAnonymousFn();
      if (deleteSuccess) {
        console.log('All Anonymous Profile deleted successfully!', miscData);
      } else {
        console.error('Failed to delete all anonymous profiles');
      }
    } catch (error) {
      console.error('Error deleting all Anonymous Profile files:', error);
    }
  };

  const handlePublicGroupProfile = async (values) => {
    const { file } = values;

    if (!file) {
      console.error('No file selected');
      return;
    }

    setIsUploading(true);

    try {
      const uploadSuccess = await publicGroupProfileFn(file);
      if (uploadSuccess) {
        console.log('File uploaded successfully!');
        await getAllPublicGroupProfilesFn(); // Fetch updated user info
      } else {
        console.error('Failed to upload public group profile');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleGetAllPublicGroupProfile = async () => {
    try {
      const uploadSuccess = await getAllPublicGroupProfilesFn();
      if (uploadSuccess) {
        console.log('All Available Public Group Profiles', groupData);
        await getAllPublicGroupProfilesFn();
      } else {
        console.error('Failed to upload public group profile');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleCreateGroup = async () => {
    const formData = {
      ownerKey: '3JkiWUaMis6ziIHwRrKsK',
      groupProfilePath:
        'http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/groupProfileCollections/PJpvlRItZVpx8XESSTr58-profile',
      name: 'Mga Kupal lang pwede',
      description:
        "I believe in creating a safe, non-judgmental space where you can freely express your thoughts and emotions without fear of being misunderstood. Everyone deserves a place where they feel heard, supported, and validated. My goal is to be that person who listens with compassion and helps you navigate the challenges you're facing. Together, we can work on finding practical solutions, building coping strategies, and restoring a sense of balance and peace in your life. Your mental well-being matters, and I’m here to support you every step of the way, helping you feel more grounded, empowered, and at ease.",
      categories: [
        { key: '6YvpSvYYFyHjp6z7UBDff' },
        { key: '1vq2KGoLu8jzXPJnz0-kq' },
        { key: 'HpT60sXah30yH7Ga1g_kq' },
      ],
      members: [
        {
          fullName: 'Super Admin',
          key: '3JkiWUaMis6ziIHwRrKsK',
          lastUpdated: '2024-10-17T00:37:12.700Z',
          role: 'super-admin',
          status: 'online',
          groupRole: 'Group Admin',
        },
        {
          fullName: 'alex',
          key: 'uOl9RnXouVl9vU1fbUXU1',
          lastUpdated: '2024-10-16T10:30:00.901Z',
          role: 'user',
          status: 'online',
          groupRole: 'member',
        },
        // {
        //   fullName: 'alex1',
        //   key: 'vJL1OEHA9SzhDt21li-0r',
        //   lastUpdated: '2024-10-16T10:33:29.627Z',
        //   role: 'user',
        //   status: 'online',
        // },
      ],
    };
    try {
      const creatSuccess = await createGroupFn(formData);
      if (creatSuccess) {
        console.log('Group Created Successfully!');
        await getAllGroupsFn();
      } else {
        console.error('Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleGetGroup = async () => {
    try {
      const getSuccess = await getGroupFn();
      if (getSuccess) {
        console.log('All Groups Fetched Successfully!');
        await getGroupFn();
      } else {
        console.error('Failed to fetch groups');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleGetAllGroups = async () => {
    try {
      const getSuccess = await getAllGroupsFn();
      if (getSuccess) {
        console.log('All Groups Fetched Successfully!');
        await getAllGroupsFn();
        console.log('All Groups: ', groupData);
      } else {
        console.error('Failed to fetch groups');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleGetUserGroup = async () => {
    const formData = {
      userKey: '3JkiWUaMis6ziIHwRrKsK',
    };
    try {
      const getSuccess = await getUserGroupFn(formData);
      if (getSuccess) {
        console.log('All Groups Fetched Successfully!');
        // await getUserGroupFn(formData);
        console.log('All Groups: ', groupData);
      } else {
        console.error('Failed to fetch groups');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleRemoveMember = async () => {};
  const handleDeleteUserGroup = async () => {
    const groupKey = 'iOgJH1CuGC3NZPn7yzkdZ';
    try {
      const deleteSuccess = await deleteUserGroupFn(groupKey);
      if (deleteSuccess) {
        console.log('User Group deleted successfully!');
      } else {
        console.error('Failed to delete user group');
      }
    } catch (error) {
      console.error('Error deleting user group:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateTopics = async () => {
    try {
      const createSuccess = await createTopicsFn();
      if (createSuccess) {
        console.log('Topics seeded successfully!');
      } else {
        console.error('Failed to seed topics');
      }
    } catch (error) {
      console.error('Error seeding topics:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllTopics = async () => {
    try {
      const getSuccess = await getAllTopicsFn();
      if (getSuccess) {
        console.log('All topics fetched successfully!', postData);
      } else {
        console.error('Failed to fetch all topics');
      }
    } catch (error) {
      console.error('Error fetching all topics:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateHealthCareSuggestions = async () => {
    try {
      const createSuccess = await createHealthCareSuggestionsFn();
      if (createSuccess) {
        console.log('Health care suggestions seeded successfully!', postData);
      } else {
        console.error('Failed to seed all health care suggestions');
      }
    } catch (error) {
      console.error('Error seeding all health care suggestions:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllHealthCareSuggestions = async () => {
    try {
      const getSuccess = await getAllHealthCareSuggestionsFn();
      if (getSuccess) {
        console.log('Health care suggestions fetched successfully!', postData);
      } else {
        console.error('Failed to fetch all health care suggestions');
      }
    } catch (error) {
      console.error('Error fetching all health care suggestions:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreatePost = async (values) => {
    const { file } = values;
    const formData1 = {
      user: {
        fullName: 'Super Admin',
        key: '3JkiWUaMis6ziIHwRrKsK',
        lastUpdated: '2024-10-17T07:06:36.176Z',
        profileImageUrl:
          'http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/userProfilePicture/3JkiWUaMis6ziIHwRrKsK-profile',
        role: 'super-admin',
        status: 'online',
      },
      title:
        'Anxiety is temporary, and so are tough times. You have the strength to overcome.',
      description:
        'Anxiety is temporary, and so are tough times. You have the strength to overcome. Remember to breathe, take breaks, and reach out when you need support. Anxiety is temporary, and so are tough times. You have the strength to overcome. Remember to breathe, take breaks, and reach out when you need support. Anxiety is temporary, and so are tough times. You have the strength to overcome. Remember to breathe, take breaks, and reach out when you need support.',
      topics: [
        { key: 'QZH3RM_hPBn1UDFchSe3l', name: 'Anxiety' },
        { key: 'hskFMOgocfBaoeIJUg8-L', name: 'Anxiety Relief' },
      ],
    };

    const formData2 = {
      user: {
        fullName: 'Super Admin',
        key: '3JkiWUaMis6ziIHwRrKsK',
        lastUpdated: '2024-10-17T07:06:36.176Z',
        profileImageUrl:
          'http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/userProfilePicture/3JkiWUaMis6ziIHwRrKsK-profile',
        role: 'super-admin',
        status: 'online',
      },
      title: 'Self-care isn’t selfish; it’s essential. Prioritize your needs.',
      description:
        'Self-care isn’t selfish; it’s essential. Prioritize your needs. Remember to make time for yourself, nurture your mental health, and practice habits that bring you peace. Self-care isn’t selfish; it’s essential. Prioritize your needs. Remember to make time for yourself, nurture your mental health, and practice habits that bring you peace. Self-care isn’t selfish; it’s essential. Prioritize your needs. Remember to make time for yourself, nurture your mental health, and practice habits that bring you peace.',
      topics: [
        { key: 'mfcmFeTJ4sUEOviF5d1Bb', name: 'Self Care' },
        { key: '5Puaks8iUShEIpbRd5KQg', name: 'Mindfulness' },
      ],
    };

    const formData3 = {
      user: {
        fullName: 'Super Admin',
        key: '3JkiWUaMis6ziIHwRrKsK',
        lastUpdated: '2024-10-17T07:06:36.176Z',
        profileImageUrl:
          'http://jx5yt-yyaaa-aaaal-abzbq-cai.localhost:5987/userProfilePicture/3JkiWUaMis6ziIHwRrKsK-profile',
        role: 'super-admin',
        status: 'online',
      },
      title:
        'Healing is a journey, not a destination. Take it one day at a time.',
      description:
        'Healing is a journey, not a destination. Take it one day at a time. Be gentle with yourself and allow your mind and heart to rest when needed. Healing is a journey, not a destination. Take it one day at a time. Be gentle with yourself and allow your mind and heart to rest when needed. Healing is a journey, not a destination. Take it one day at a time. Be gentle with yourself and allow your mind and heart to rest when needed.',
      topics: [
        { key: 'Z4GS2HBoYVWKfg0O402Y9', name: 'Healing Journey' },
        { key: 'JvEBDizXvmCKJEt2XT5c2', name: 'Therapy Is Cool' },
      ],
    };

    try {
      const createSuccess = await createPostFn(formData3, file);
      if (createSuccess) {
        console.log('Post created successfully!');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetAllUserPosts = async () => {
    try {
      const getSuccess = await getAllUserPostsFn();
      if (getSuccess) {
        console.log('All User Post fetched successfully!', postData);
      } else {
        console.error('Failed to fetch all user post');
      }
    } catch (error) {
      console.error('Error fetching all user post:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAllUserPosts = async () => {
    try {
      const deleteSuccess = await deleteAllUserPostsFn();
      if (deleteSuccess) {
        console.log('All User Post deleted successfully!');
      } else {
        console.error('Failed to delete all user post');
      }
    } catch (error) {
      console.error('Error deleting all user post:', error);
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
          {...form.getInputProps('file')}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={isUploading}>
          {isUploading ? 'Uploading...' : 'Submit'}
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
          {...form.getInputProps('file')}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={isUploading}>
          {isUploading ? 'Uploading...' : 'Create Anonymous Profile'}
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
        <Button onClick={handleGetAllGroups} loading={groupLoading}>
          Get All Groups
        </Button>
        <Button onClick={handleGetUserGroup} loading={groupLoading}>
          Get User Group
        </Button>
        <Button onClick={handleRemoveMember} loading={groupLoading}>
          Remove Member
        </Button>
        <Button onClick={handleDeleteUserGroup} loading={groupLoading}>
          Delete User Group
        </Button>
      </Group>

      <Title order={2} mt="xl">
        Upload Public Group Profiles
      </Title>
      <form onSubmit={form.onSubmit(handlePublicGroupProfile)}>
        <FileInput
          label="Upload file here"
          {...form.getInputProps('file')}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={isUploading}>
          {isUploading ? 'Uploading...' : 'Create Public Group Profile'}
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
      <form onSubmit={form.onSubmit(handleCreatePost)}>
        <FileInput
          label="Upload file here"
          {...form.getInputProps('file')}
          disabled={isUploading}
        />
        <Button type="submit" mt="md" loading={postLoading}>
          {isUploading ? 'Uploading...' : 'Create Anonymous Profile'}
        </Button>
      </form>
      {message && <p>{message}</p>}
    </Box>
  );
}

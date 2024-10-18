import React, { useEffect, useMemo, useState } from "react";
import {
  Title,
  Box,
  FileInput,
  Button,
  LoadingOverlay,
  Image,
  Modal,
  Card,
} from "@mantine/core";
import { useUsersStore } from "../store/users";
import { useShallow } from "zustand/shallow";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

import { POSTS } from "../static/home";
import SampleUserImage1 from "../assets/images/SampleUserImage1.webp";

import PostSection from "../components/posts/PostSection";
import HeadingCard from "../components/headings/HeadingCard";
import PostModal from "../components/modals/PostModal";

import IconSave from "../assets/icons/buttons/IconSave.svg";
import IconReport from "../assets/icons/header/IconInfo.svg";

// Static data
const sample_post = {
  id: 1,
  userProfileImage: SampleUserImage1,
  userName: "Chubby Bunny",
  userRole: "Ease Companion",
  postTitle: "Understanding the Importance of Mental Health in Modern Society",
  postContent:
    "Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health.",
  tags: ["Anxiety", "Depression", "Sadness"],
  hashtags: ["keepItPositive", "anxiety"],
};

const postOptionsAttributes = [
  {
    icon: IconSave,
    label: "Save",
    value: "save",
  },
  {
    icon: IconReport,
    label: "Report",
    value: "report",
  },
];

const profileIndicatorStyling = {
  padding: "",
  width: 55,
  height: 55,
};

export default function HomePage() {
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

  const [isUploading, setIsUploading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPostID, setSelectedPostID] = useState("");

  useEffect(() => {
    // getUserInfoFn();
    // getAllUsersFn();
    // deleteUserInfoFn();
    // console.log(message);
    // console.log(data);
  }, [data, message]); // eslint-disable-line react-hooks/exhaustive-deps

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      file: null,
    },
  });

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

  const postsContent = POSTS.map((post) => {
    return (
      <Card withBorder radius={10} my={20} p={25} key={post.id}>
        <PostSection
          {...post}
          key={post.id}
          onOpen={open}
          options={postOptionsAttributes}
          profileIndicatorStyling={profileIndicatorStyling}
        />
      </Card>
    );
  });

  const filterHeader = (
    <HeadingCard
      title="Anxiety"
      description="Explore and dive into the following filtered insights on Anxiety—scroll through to find what resonates with you!"
    />
  );
  return (
    <Box p={5}>
      {/* <Box position="relative">
        <LoadingOverlay visible={isUploading || loading} overlayBlur={2} />
        <Title>Home Page</Title>

        {data &&
          data.userCredentials &&
          data.userCredentials.data &&
          data.userCredentials.data.profileImageUrl && (
            <Box mt="md">
              <Title order={4}>Profile Image:</Title>
              <Image
                src={data.userCredentials.data.profileImageUrl} // Fix: use profileImageUrl from userCredentials.data
                alt="Profile"
                width={200}
                height={200}
                fit="contain"
                withPlaceholder
              /> */}
      {/* <img
      src={data.user.profileImageUrl}
      alt="Profile"
      width={200}
      height={200}
      style={{ objectFit: 'contain' }}
    /> */}
      {/* </Box>
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
      </Box> */}
      {filterHeader}
      {postsContent}
      <PostModal
        openModal={opened}
        closeModal={close}
        sample={sample_post}
        options={postOptionsAttributes}
        profileIndicatorStyling={profileIndicatorStyling}
        {...sample_post}
      />
    </Box>
  );
}

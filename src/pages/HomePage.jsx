import React, { useEffect, useState } from "react";
import {
  Title,
  Box,
  FileInput,
  Button,
  LoadingOverlay,
  Image,
} from "@mantine/core";
import { useUsersStore } from "../store/users";
import { useShallow } from "zustand/shallow";
import { useForm } from "@mantine/form";

import { POSTS } from "../static/home";

import PostSection from "../components/PostSection";



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
    return <PostSection {...post} key={post.id}/>
  });

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
      {postsContent}
    </Box>
  );
}

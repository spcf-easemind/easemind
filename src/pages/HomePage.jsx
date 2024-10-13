import { Title, Box, FileInput, Button } from "@mantine/core";
import { useUsersStore } from "../store/users";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useForm } from "@mantine/form";

export default function HomePage() {
  const { getAllUsers } = useUsersStore(
    useShallow((state) => ({
      getAllUsers: state.getAllUsers,
    }))
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      file: null,
    },
  });

  const handleSubmitFile = (values) => {
    const { file } = values;

    try {
      console.log("File selected:", file);
      const formData = new FormData();
      formData.append("file", file);
      // Function
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Box>
      <Title>Home Page</Title>
      <form onSubmit={form.onSubmit(handleSubmitFile)}>
        <FileInput
          label="Upload file here"
          key={form.key("file")}
          {...form.getInputProps("file")}
        />
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
    </Box>
  );
}

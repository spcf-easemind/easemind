import { Title, Box } from "@mantine/core";
import { useUsersStore } from "../store/users";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function HomePage() {
  const { getAllUsers } = useUsersStore(
    useShallow((state) => ({
      getAllUsers: state.getAllUsers,
    }))
  );

  useEffect(() => {
    getAllUsers();
  }, []);
  
  return (
    <Box>
      <Title>Home Page</Title>
    </Box>
  );
}

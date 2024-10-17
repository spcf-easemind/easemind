import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import { useGroupAPIStore } from "../../store/group-api";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

const header = {
  title: "Joined Groups",
  description: null,
};

export default function JoinedGroupsPage() {
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const { joinedGroups, fetchJoinedGroupsFn } = useGroupAPIStore(
    useShallow((state) => ({
      joinedGroups: state.joinedGroups,
      fetchJoinedGroupsFn: state.fetchJoinedGroups,
    }))
  );

  console.log(joinedGroups);

  useEffect(() => {
    fetchJoinedGroupsFn(loggedInUserKey);
  }, []);

  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />

      <Box mt={18}>{/* Group Grid */}</Box>
    </Paper>
  );
}

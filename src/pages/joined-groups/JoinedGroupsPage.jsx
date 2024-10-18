import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import { useGroupAPIStore } from "../../store/group-api";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import GroupGrid from "../../components/grid/GroupGrid";
import { useNavigate } from "react-router-dom";

const header = {
  title: "Joined Groups",
  description: null,
};

export default function JoinedGroupsPage() {
  const navigate = useNavigate();
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const { joinedGroups, fetchJoinedGroupsFn } = useGroupAPIStore(
    useShallow((state) => ({
      joinedGroups: state.joinedGroups,
      fetchJoinedGroupsFn: state.fetchJoinedGroups,
    }))
  );

  useEffect(() => {
    fetchJoinedGroupsFn(loggedInUserKey);
  }, []);

  function handleSelect(ref) {
    navigate(`/joined-group/${ref}`);
  }

  function handleButtonClick() {
    console.log("View Chat");
  }

  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />

      <Box mt={18}>
        <GroupGrid
          groupData={joinedGroups}
          type="joined"
          onButtonClick={handleButtonClick}
          onSelect={handleSelect}
        />
      </Box>
    </Paper>
  );
}

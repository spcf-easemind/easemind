import { Paper, Box } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import GroupGrid from "../../components/grid/GroupGrid";
import { useNavigate } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

const header = {
  title: "Community Groups",
  description:
    "Discover community groups that match your interests and needs. Engage with others, share experiences, and build meaningful connections to become the best version of yourself.",
};

export default function CommunityGroupsPage() {
  const navigate = useNavigate();

  // Zustand
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const { fetchCommunityGroupsFn, communityGroups } = useGroupAPIStore(
    useShallow((state) => ({
      fetchCommunityGroupsFn: state.fetchCommunityGroups,
      communityGroups: state.communityGroups,
    }))
  );

  useEffect(() => {
    fetchCommunityGroupsFn(loggedInUserKey);
  }, []);

  function handleSelect(ref) {
    navigate(`/community-groups/${ref}`);
  }

  function handleJoinGroup(ref) {
    console.log(`Join group with ref: ${ref}`);
  }

  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />

      <Box mt={18}>
        <GroupGrid
          groupData={communityGroups}
          onButtonClick={handleJoinGroup}
          type="community"
          onSelect={handleSelect}
        />
      </Box>
    </Paper>
  );
}

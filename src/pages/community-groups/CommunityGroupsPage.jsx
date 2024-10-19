import { Paper, Box } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import GroupGrid from "../../components/grid/GroupGrid";
import { useNavigate } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { notificationsFn } from "../../utils/notifications";

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

  const { fetchCommunityGroupsFn, communityGroups, joinGroupFn, loading } =
    useGroupAPIStore(
      useShallow((state) => ({
        fetchCommunityGroupsFn: state.fetchCommunityGroups,
        communityGroups: state.communityGroups,
        joinGroupFn: state.joinGroup,
        loading: state.loading,
      }))
    );

  useEffect(() => {
    fetchCommunityGroupsFn(loggedInUserKey);
  }, []);

  function handleSelect(ref) {
    navigate(`/community-group/${ref}`);
  }

  async function handleJoinGroup(ref) {
    const id = notificationsFn.load();
    const response = await joinGroupFn(loggedInUserKey, ref);

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      await fetchCommunityGroupsFn(loggedInUserKey);

    } else {
      notificationsFn.error(id, response.message);
    }
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
          loading={loading}
        />
      </Box>
    </Paper>
  );
}

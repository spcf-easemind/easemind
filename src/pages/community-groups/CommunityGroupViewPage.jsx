import DisplayCard from "../../components/cards/DisplayCard";
import { Paper } from "@mantine/core";
import { useEffect } from "react";
import { useGroupAPIStore } from "../../store/group-api";
import { useShallow } from "zustand/shallow";
import { useNavigate, useParams } from "react-router-dom";
import { notificationsFn } from "../../utils/notifications";

export default function CommunityGroupViewPage() {
  const { communityGroupRef } = useParams();
  const navigate = useNavigate();

  const { fetchCommunityGroupFn, communityGroup, loading, joinGroupFn } =
    useGroupAPIStore(
      useShallow((state) => ({
        fetchCommunityGroupFn: state.fetchCommunityGroup,
        communityGroup: state.communityGroup,
        joinGroupFn: state.joinGroup,
        loading: state.loading,
      }))
    );

  useEffect(() => {
    fetchCommunityGroupFn(communityGroupRef);
  }, []);

  async function handleJoinGroup(userKey) {
    console.log(userKey, communityGroupRef);
    const id = notificationsFn.load();
    const response = await joinGroupFn(userKey, communityGroupRef);

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      navigate(`/joined-group/${response.key}`);
    } else {
      notificationsFn.error(id, response.message);
    }
  }

  return (
    communityGroup && (
      <Paper>
        <DisplayCard
          instance={communityGroup}
          variant="view"
          button={{ buttonLabel: "Join", loading: loading }}
          type="community"
          onButtonClick={handleJoinGroup}
        />
      </Paper>
    )
  );
}

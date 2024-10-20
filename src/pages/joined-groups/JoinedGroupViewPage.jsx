import { Paper } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import DisplayCard from "../../components/cards/groups/DisplayCard";
import { useGroupAPIStore } from "../../store/group-api";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { notificationsFn } from "../../utils/notifications";
import { useAuthenticationStore } from "../../store/authentication";

export default function JoinedGroupViewPage() {
  const { joinedGroupRef } = useParams();
  const navigate = useNavigate();

  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const { fetchJoinedGroupFn, joinedGroup, removeGroupMemberFn } =
    useGroupAPIStore(
      useShallow((state) => ({
        removeGroupMemberFn: state.removeGroupMember,
        fetchJoinedGroupFn: state.fetchJoinedGroup,
        joinedGroup: state.joinedGroup,
      }))
    );

  useEffect(() => {
    fetchJoinedGroupFn(joinedGroupRef);
  }, []);

  function handleButtonClick() {
    console.log("View Chat");
  }

  async function handleLeaveGroup() {
    const id = notificationsFn.load();
    const response = await removeGroupMemberFn(joinedGroupRef, loggedInUserKey);

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      navigate("/joined-groups");
    } else {
      notificationsFn.error(id, response.message);
    }
  }

  return (
    joinedGroup && (
      <Paper>
        <DisplayCard
          instance={joinedGroup}
          variant="view"
          type="joined"
          button={{ buttonLabel: "View Chat", loading: false }}
          onButtonClick={handleButtonClick}
          onLeaveBtnClick={handleLeaveGroup}
        />
      </Paper>
    )
  );
}

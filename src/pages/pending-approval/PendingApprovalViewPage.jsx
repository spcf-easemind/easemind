import { Paper } from "@mantine/core";
import PendingApprovalCard from "../../components/cards/PendingApprovalCard";
import { useGroupAPIStore } from "../../store/group-api";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { notificationsFn } from "../../utils/notifications";

export default function PendingApprovalPageView() {
  const { pendingApprovalRef } = useParams();

  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );
  const { fetchPendingMembersFn, pendingMembers, memberApprovalFn } =
    useGroupAPIStore(
      useShallow((state) => ({
        memberApprovalFn: state.memberApproval,
        fetchPendingMembersFn: state.fetchPendingMembers,
        pendingMembers: state.pendingMembers,
      }))
    );

  useEffect(() => {
    fetchPendingMembersFn(pendingApprovalRef);
  }, []);

  async function handleApproval(choice, payload) {
    const id = notificationsFn.load();
    const response = await memberApprovalFn(
      choice,
      pendingApprovalRef,
      payload
    );

    if (response) {
      notificationsFn.success(id, response.message);
    } else {
      notificationsFn.error(id, response.message);
    }
  }

  const pendingMembersInstances = pendingMembers.map((member) => (
    <PendingApprovalCard
      image={member.userInfo.profileImageUrl}
      name={member.userInfo.fullName}
      role={member.userInfo.role}
      payload={member.pendingMembers[0]}
      onClick={(choice) => handleApproval(choice, member.pendingMembers[0])}
    />
  ));
  return <Paper>{pendingMembersInstances}</Paper>;
}

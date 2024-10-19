import { SimpleGrid } from "@mantine/core";
import PendingCard from "../cards/PendingCard";

export default function PendingGrid({ pendingApprovals, onClick }) {
  const label = "10 Pending";

  const pendingInstances = pendingApprovals.map((instance) => (
    <PendingCard
      image={instance.groupInfo.groupImageUrl}
      name={instance.groupInfo.name}
      membersCount={instance.groupInfo.membersCount}
      button={{
        approvalCount: instance.groupPendingMemberCount,
        onClick: () => onClick(instance.groupInfo.key),
      }}
    />
  ));

  return <SimpleGrid cols={2}>{pendingInstances}</SimpleGrid>;
}

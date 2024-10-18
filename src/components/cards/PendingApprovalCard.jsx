import { ActionIcon, Card, Title } from "@mantine/core";
import GroupMemberCard from "./GroupMemberCard";
import { IconDotsVertical } from "@tabler/icons-react";
import ActionsBox from "../ActionsBox";

import IconXCircle from "../../assets/icons/buttons/IconXCircle.svg";
import IconCheckCircle from "../../assets/icons/buttons/IconCheckCircle.svg";

const popoverOptions = [
  {
    value: "approve",
    icon: IconCheckCircle,
    label: "Approve",
    textColor: "green.5",
  },
  {
    value: "reject",
    icon: IconXCircle,
    label: "Reject",
    textColor: "red.5",
  },
];

export default function PendingApprovalCard() {
  return (
    <Card withBorder bg="gray.0" py={28}>
      <Title order={3} mb={12}>
        Pending Approval
      </Title>

      <GroupMemberCard
        image={null}
        role="Easebuddy"
        name="Gabriel Gatbonton"
        bg="sky-blue.0"
      >
        <ActionsBox options={popoverOptions}>
          <ActionIcon variant="subtle" radius="xl" color="black">
            <IconDotsVertical size={20} stroke={1.5} />
          </ActionIcon>
        </ActionsBox>
      </GroupMemberCard>
    </Card>
  );
}

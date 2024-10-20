import { Card, Title } from "@mantine/core";
import GroupMemberCard from "./GroupMemberCard";
import { IconDotsVertical } from "@tabler/icons-react";
import ActionsBox from "../../ActionsBox";
import { APPROVE_REJECT } from "../../../static/popover";

const popoverOptions = APPROVE_REJECT;

export default function PendingApprovalCard({ image, role, name, onClick }) {
  return (
    <Card withBorder bg="gray.0" py={28}>
      <Title order={3} mb={12}>
        Pending Approval
      </Title>

      <GroupMemberCard image={image} role={role} name={name} bg="sky-blue.0">
        <ActionsBox
          onClick={(choice) => onClick(choice)}
          options={popoverOptions}
        >
          <IconDotsVertical size={20} stroke={1.5} />
        </ActionsBox>
      </GroupMemberCard>
    </Card>
  );
}

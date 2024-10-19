import { Card, Group, Text } from "@mantine/core";
import ActionsBox from "../ActionsBox";
import { IconDotsVertical } from "@tabler/icons-react";
import { EDIT_DELETE } from "../../static/popover";

const popoverOptions = EDIT_DELETE;

export default function TaskCard() {
  return (
    <Card radius="lg" bg="gray.0" withBorder>
      <Group>
        <Text flex={1}>Task Sample</Text>
        <ActionsBox options={popoverOptions}>
          <IconDotsVertical size={30} stroke={1.5} />
        </ActionsBox>
      </Group>
    </Card>
  );
}

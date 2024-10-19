import { Card, Box, Title, Text } from "@mantine/core";
import ActionsBox from "../ActionsBox";
import { IconDotsVertical } from "@tabler/icons-react";
import IconHistory from "../../assets/icons/buttons/IconHistory.svg";

const popoverOptions = [
  {
    value: "edit",
    icon: IconHistory,
    label: "Edit",
    textColor: "dark.5",
  },
];

export default function MoodTrackerCard({ onPopoverClick }) {
  return (
    <Card bg="gray.0" radius="lg" withBorder>
      <Box pos="relative" ta="center">
        <Box>
          <Title order={2} mb={10}>
            Mood This Week
          </Title>
          <Text size="sm" c="dimmed">
            This mood tracker records your daily emotions throughout the week.
          </Text>
        </Box>

        <Box pos="absolute" top={0} right={0}>
          {" "}
          <ActionsBox
            onClick={(choice) => onPopoverClick(choice, "1")}
            options={popoverOptions}
          >
            <IconDotsVertical size={30} stroke={1.5} />
          </ActionsBox>
        </Box>
      </Box>
    </Card>
  );
}

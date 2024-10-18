import {
  Avatar,
  Box,
  Card,
  Group,
  Title,
  Text,
  ActionIcon,
  Stack,
} from "@mantine/core";
import ActionsBox from "../ActionsBox";
import { IconDotsVertical } from "@tabler/icons-react";
import IconPencil from "../../assets/icons/buttons/IconPencil.svg";
import IconTrashcan from "../../assets/icons/buttons/IconTrashcan.svg";
import Pill from "../pills/Pill";

const sample_pills = [
  "Depression",
  "Loneliness",
  "Anxiety",
  "Depression",
  "Loneliness",
  "Anxiety",
];

const popoverOptions = [
  {
    value: "edit",
    icon: IconPencil,
    label: "Edit",
    textColor: "dark.5",
  },
  {
    value: "delete",
    icon: IconTrashcan,
    label: "Delete",
    textColor: "dark.5",
  },
];

export default function PostCard({ onPopoverSelect }) {
  const pillInstances = sample_pills.map((pill, index) => (
    <Pill name={pill} size="md" key={`pill-${index}`} />
  ));
  return (
    <Card withBorder bg="gray.0" radius="lg">
      <Stack>
        <Group>
          <Avatar w={44} h={44} radius="sm" />
          <Box flex={1}>
            <Title order={6} fw={500}>
              Love Grave
            </Title>
            <Text size="xs" c="dimmed">
              EaseCompanion
            </Text>
          </Box>
          <ActionsBox
            onClick={(option) => onPopoverSelect(option, "1")}
            options={popoverOptions}
          >
            <ActionIcon radius="xl" variant="subtle" color="black">
              <IconDotsVertical size={30} stroke={1.5} />
            </ActionIcon>
          </ActionsBox>
        </Group>

        <Box>
          <Title order={3} mb={12}>
            Remember, your well-being matters. Take time to meditate, love
            yourself, and prioritize your mental health......
          </Title>
          <Text lh={1.3}>
            Remember, your well-being matters. Take time to meditate, love
            yourself, and prioritize your mental health. Remember, your
            well-being matters. Take time to meditate, love yourself, and
            prioritize your mental health. Remember, your well-being matters.
            Take time to meditate, love yourself, and prioritize your mental
            health.
          </Text>
        </Box>

        <Box>
          <Title order={4}>Topics Related</Title>
          <Group gap={8} mt={12}>
            {pillInstances}
          </Group>
        </Box>
      </Stack>
    </Card>
  );
}

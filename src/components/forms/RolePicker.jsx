import { Stack, Title, Text, Group, Box, Card } from "@mantine/core";
import CardButton from "../buttons/CardButton.jsx";

import IconManyPeople from "../../assets/icons/IconManyPeople.svg";
import IconVolunteer from "../../assets/icons/IconVolunteer.svg";

export default function RolePicker({ onClick }) {
  function handleOnClick(value) {
    const data = {
      role: value,
    };
    onClick(data);
  }

  return (
    <>
      <Group justify="center" gap={48}>
        <Stack align="center">
          <CardButton
            image={IconManyPeople}
            alt="Interface Icon of 3 People"
            value="EaseBuddy"
            onClick={handleOnClick}
          />
          <Box ta="center" c="white">
            <Title order={3}>User</Title>
            <Text size="xs" maw={150}>
              Share your feelings and connect with others.
            </Text>
          </Box>
        </Stack>

        <Stack align="center">
          <CardButton
            image={IconVolunteer}
            alt="Interface Icon of Volunteer Jacket"
            value="EaseCompanion"
            onClick={handleOnClick}
          />
          <Box ta="center" c="white">
            <Title order={3}>Volunteer</Title>
            <Text size="xs" maw={150}>
              Support others in their mental health journey.
            </Text>
          </Box>
        </Stack>
      </Group>

      <Card.Section bg="white" p={16} mih={100} pos="absolute" bottom={0}>
        <Text size="sm" ta="center">
          You are valuable, no matter the challenges you face. Your feelings,
          struggles, and experiences matter. You deserve to be seen, heard, and
          loved unconditionally. Your mental health is important, and you are
          worthy of support at every step of the way.
        </Text>
      </Card.Section>
    </>
  );
}

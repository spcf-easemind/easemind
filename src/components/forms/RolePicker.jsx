import { Stack, Title, Text, Group, Box } from "@mantine/core";
import { useMatches } from "@mantine/core";
import classes from "./RolePicker.module.css";

import UserButton from "../buttons/UserButton.jsx";

export default function RolePicker() {
  const marginBottom = useMatches({
    base: 16,
    md: 32,
  });
  return (
    <>
      <Stack align="center" mb={marginBottom}>
        <Title className={classes.title}>Choose your Role</Title>
        <Text className={classes.subTitle}>
          How would you like to be a part of Easemind?
        </Text>
      </Stack>

      <Group justify="center" gap={48}>
        <Stack align="center">
          <UserButton />
          <Box ta="center" c="white">
            <Title order={3}>User</Title>
            <Text size="xs" maw={150}>
              Share your feelings and connect with others.
            </Text>
          </Box>
        </Stack>

        <Stack align="center">
          <UserButton />
          <Box ta="center" c="white">
            <Title order={3}>Volunteer</Title>
            <Text size="xs" maw={150}>
              Support others in their mental health journey.
            </Text>
          </Box>
        </Stack>
      </Group>

      <Box className={classes.cardFooter}></Box>

      <Box className={classes.footerText}>
        <Text size="sm">
          You are valuable, no matter the challenges you face. Your feelings,
          struggles, and experiences matter. You deserve to be seen, heard, and
          loved unconditionally. Your mental health is important, and you are
          worthy of support at every step of the way.
        </Text>
      </Box>
    </>
  );
}

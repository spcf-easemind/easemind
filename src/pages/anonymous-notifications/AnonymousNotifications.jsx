import { Card, Title, Text, Box, Group, Switch } from "@mantine/core";

export default function AnonymousNotifications() {
  return (
    <>
      <Card
        px={20}
        py={28}
        mx="auto"
        bg="gray.0"
        withBorder
        radius="md"
        maw={800}
      >
        <Title order={3}>Go Anonymous</Title>
        <Text mt={8} lh={1.2}>
          Want complete anonymity? Enable Anonymous Mode to hide your personal
          information, ensuring your identity stays confidential while
          connecting with others or accessing mental health support resources.
        </Text>
        <Group mt={18} py={18} justify="space-between" align="center">
          <Title order={4}>Anonymous Mode</Title>
          <Switch size="lg" />
        </Group>
      </Card>

      <Card
        mt={18}
        px={20}
        py={28}
        mx="auto"
        bg="gray.0"
        withBorder
        radius="md"
        maw={800}
      >
        <Title order={3}>Notifications</Title>
        <Text mt={8} lh={1.2}>
          Turn on notifications to stay updated, or turn them off if you prefer
          not to receive any notifications.
        </Text>
        <Group mt={18} py={18} justify="space-between" align="center">
          <Title order={4}>Notifications</Title>
          <Switch size="lg" />
        </Group>
      </Card>
    </>
  );
}

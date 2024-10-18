import { Avatar, Box, Card, Group, Title, Text, Button } from "@mantine/core";

export default function PendingCard({
  image,
  name,
  role,
  button: { label, onClick },
}) {
  return (
    <Card withBorder bg="gray.0">
      <Group align="center">
        <Avatar src={image} w={44} h={44} radius="sm" />
        <Box flex={1}>
          <Title order={6} fw={500}>
            Notifications Test
          </Title>
          <Text size="xs" c="dimmed">
            20 Members
          </Text>
        </Box>

        <Button onClick={onClick} size="xs" px={10} fw={500}>
          10 Pending
        </Button>
      </Group>
    </Card>
  );
}

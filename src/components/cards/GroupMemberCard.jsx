import { Box, Card, Group, Avatar, Title, Text } from "@mantine/core";

export default function GroupMemberCard({ image, name, role, children }) {
  return (
    <Card px={18} py={12} bg="gray.0">
      <Group>
        <Avatar src={image} w={44} h={44} radius="sm" />
        <Box flex={1}>
          <Title order={5} fw={500}>
            {name}
          </Title>
          <Text size="sm" c="dimmed">
            {role}
          </Text>
        </Box>
        {children}
      </Group>
    </Card>
  );
}

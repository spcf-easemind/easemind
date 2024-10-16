import { Box, Card, Group, Image, Title, Text } from "@mantine/core";

export default function GroupMemberCard({ image, children }) {
  return (
    <Card px={18} py={12} bg="gray.0">
      <Group>
        <Image src={image} w={44} h={44} radius="sm" />
        <Box flex={1}>
          <Title order={5} fw={500}>
            Sophia Reyes
          </Title>
          <Text size="sm" c="dimmed">
            Group Admin
          </Text>
        </Box>
        {children}
      </Group>
    </Card>
  );
}

import { Card, Title, Text } from "@mantine/core";

export default function HeadingCard({ title, description }) {
  return (
    <Card padding={16} withBorder radius="lg" ta="center" bg="gray.0">
      <Title order={2} mb={8}>
        {title}
      </Title>
      <Text size="sm">{description}</Text>
    </Card>
  );
}

import { Card, Title, Text } from "@mantine/core";

export default function HeadingCard({ title, description }) {
  return (
    <Card padding={16} withBorder radius="lg" ta="center" bg="gray.0">
      <Title order={2} mb={description ? 8 : undefined}>
        {title}
      </Title>
      {description && <Text size="sm">{description}</Text>}
    </Card>
  );
}

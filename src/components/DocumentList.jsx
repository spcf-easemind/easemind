import { Card, Text, Stack, Group } from "@mantine/core";
import { IconFileFilled } from "@tabler/icons-react";

export default function DocumentList({ documents }) {
  const docInstances = documents.map((document) => (
    <Card
      component="a"
      href={document.fileURL}
      download={document.fileName}
      target="_blank"
      key={document.id}
      padding={12}
      radius="md"
      style={{
        backgroundColor: "var(--mantine-primary-color-0)",
        color: "var(--mantine-primary-color-6)",
      }}
    >
      <Group>
        <IconFileFilled size={20} stroke={1.5} />
        <Text truncate="end">{document.fileName}</Text>
      </Group>
    </Card>
  ));
  return <Stack>{docInstances}</Stack>;
}

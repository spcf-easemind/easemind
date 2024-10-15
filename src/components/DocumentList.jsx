import { Card, Text, Stack } from "@mantine/core";

export default function DocumentList({ documents }) {
  const docInstances = documents.map((document) => (
    <Card
      component="a"
      key={document.id}
      padding={12}
      radius="md"
      style={{
        backgroundColor: "var(--mantine-primary-color-0)",
      }}
    >
      <Text truncate="end">{document.fileURL}</Text>
    </Card>
  ));
  return <Stack>{docInstances}</Stack>;
}

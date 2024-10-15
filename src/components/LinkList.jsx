import { Card, Stack, Text } from "@mantine/core";

export default function LinkList({ links }) {
  console.log(links);
  const linkInstances = links.map((link) => (
    <Card
      component="a"
      href={link.fileURL}
      key={link.id}
      padding={12}
      radius="md"
      target="_blank"
      style={{
        backgroundColor: "var(--mantine-primary-color-0)",
      }}
    >
      <Text truncate="end">{link.fileURL}</Text>
    </Card>
  ));
  return <Stack>{linkInstances}</Stack>;
}

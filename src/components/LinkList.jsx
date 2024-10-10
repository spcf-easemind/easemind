import { Card, Stack, Text } from "@mantine/core";

export default function LinkList({ links }) {
  const linkInstances = links.map((link) => (
    <Card
      component="a"
      href={link}
      key={link}
      padding={12}
      radius="md"
      target="_blank"
      style={{
        backgroundColor: "var(--mantine-primary-color-0)",
      }}
    >
      <Text truncate="end">{link}</Text>
    </Card>
  ));
  return <Stack>{linkInstances}</Stack>;
}

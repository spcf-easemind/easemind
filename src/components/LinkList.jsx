import { Anchor, Card, Group, Stack, Text } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { formatters } from "../utils/formatters";

export default function LinkList({ links }) {
  const linkInstances = links.map((link) => (
    <Card
      key={link.id}
      padding={12}
      radius="md"
      style={{
        backgroundColor: "var(--mantine-primary-color-0)",
      }}
    >
      <Anchor
        href={formatters.formatUrl(link.message)}
        target="_blank"
        underline="never"
      >
        <Group align="center">
          <IconLink size={20} stroke={1.5} />{" "}
          <Text truncate="end">{link.message}</Text>
        </Group>
      </Anchor>
    </Card>
  ));
  return <Stack>{linkInstances}</Stack>;
}

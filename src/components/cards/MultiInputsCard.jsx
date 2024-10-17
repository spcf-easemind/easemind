import { Card, Divider, ScrollArea } from "@mantine/core";

export default function MultiInputsCard({ header, children }) {
  return (
    <Card withBorder radius="md" padding={0} mih={350} mah={400}>
      <Card.Section p={20} mih={70}>
        {header}
      </Card.Section>

      <Divider />

      <ScrollArea p={16}>{children}</ScrollArea>
    </Card>
  );
}

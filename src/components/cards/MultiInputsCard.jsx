import { Card, Divider, ScrollArea } from "@mantine/core";
import TextValidation from "../validation/TextValidation";

export default function MultiInputsCard({ formError, header, children }) {
  return (
    <Card
      withBorder
      radius="md"
      padding={0}
      mih={350}
      style={{
        borderColor: formError ? "var(--mantine-color-red-5)" : undefined,
      }}
    >
      <Card.Section p={20} mih={70}>
        {header}
        <TextValidation formError={formError} />
      </Card.Section>

      <Divider />

      <ScrollArea p={16}>{children}</ScrollArea>
    </Card>
  );
}

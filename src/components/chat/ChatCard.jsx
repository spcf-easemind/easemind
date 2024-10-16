import { Card, Text } from "@mantine/core";

export default function ChatCard({ text, ...props }) {
  return (
    <Card
      px={20}
      py={10}
      radius="md"
      style={{
        backgroundColor: "var(--mantine-primary-color-0)",
      }}
      {...props}
    >
      {text}
    </Card>
  );
}

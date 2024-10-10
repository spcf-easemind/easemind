import { Box, Card, Checkbox, Group, Stack, Text, Image } from "@mantine/core";
import { useState } from "react";

export default function CheckboxList({ label, checkboxes }) {
  const [value, setValue] = useState([]);
  const checkboxInstances = checkboxes.map((checkbox) => (
    <Checkbox.Card
      key={checkbox.id}
      padding={0}
      value={checkbox.name}
      style={{ border: "none" }}
    >
      <Group wrap="nowrap">
        <Image src={checkbox.image} w={44} h={44} radius="md" />
        <Text fw={500} flex={1}>
          {checkbox.name}
        </Text>
        <Checkbox.Indicator />
      </Group>
    </Checkbox.Card>
  ));
  return (
    <Box>
      <Text size="sm" c="dimmed" mb={10}>
        {label}
      </Text>
      <Checkbox.Group value={value} onChange={setValue}>
        <Stack gap={15}>{checkboxInstances}</Stack>
      </Checkbox.Group>
    </Box>
  );
}

import { Box, Checkbox, Group, Stack, Text, Avatar } from "@mantine/core";

export default function CheckboxList({ label, checkboxes, ...props }) {
  const checkboxInstances = checkboxes.map((checkbox) => (
    <Checkbox.Card
      key={checkbox.id}
      padding={0}
      value={checkbox.id}
      style={{ border: "none" }}
    >
      <Group wrap="nowrap">
        <Avatar src={checkbox.image} w={44} h={44} radius="md" />
        <Text fw={500} flex={1}>
          {checkbox.name}
        </Text>
        <Checkbox.Indicator />
      </Group>
    </Checkbox.Card>
  ));
  return (
    <Box>
      <Text size="sm" c="dimmed" mb={16}>
        {label}
      </Text>
      <Checkbox.Group {...props}>
        <Stack gap={15}>{checkboxInstances}</Stack>
      </Checkbox.Group>
    </Box>
  );
}

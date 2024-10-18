import { Group, Avatar, Box, Title, Text } from "@mantine/core";

export default function UserProfileIndicator({
  profile,
  name,
  role,
  padding,
  height,
  width,
}) {
  return (
    <Group p={padding}>
      <Avatar src={profile} w={width} h={height} radius={10} />
      <Box>
        <Title order={4}>{name}</Title>
        <Text size="sm" c="gray">
          {role}
        </Text>
      </Box>
    </Group>
  );
}

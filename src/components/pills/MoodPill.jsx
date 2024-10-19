import { Box, Card, Group, Image, Text } from "@mantine/core";
export default function MoodPill({ icon, percentage }) {
  return (
    <Card bg="sky-blue.1" h={60} radius="xl" padding={5}>
      <Card
        radius="xl"
        bg="sky-blue.2"
        h="100%"
        w={`${percentage}%`}
        padding={5}
      >
        <Group h="inherit" justify="space-between" wrap="no-wrap">
          <Image src={icon} fit="contain" h="inherit" width={50} radius="xl" />
          <Box px={10}>
            <Text
              style={{
                fontFamily: "var(--mantine-baloo-bhai-2)",
              }}
              fw={600}
            >
              {percentage}%
            </Text>
          </Box>
        </Group>
      </Card>
    </Card>
  );
}

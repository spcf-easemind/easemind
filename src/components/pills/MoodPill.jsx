import { Box, Card, Group, Image, Text } from "@mantine/core";
import classes from "./MoodPill.module.css";
export default function MoodPill({ icon, percentage }) {
  return (
    <Card className={classes.pillBg} h={60} radius="xl" padding={5}>
      <Card
        radius="xl"
        h="100%"
        className={classes.pillFg}
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

import { Card, Box, Title, Text, Stack, Anchor } from "@mantine/core";

import { IconDotsVertical } from "@tabler/icons-react";
import IconHistory from "../../assets/icons/buttons/IconHistory.svg";
import IconEmojiHappy from "../../assets/icons/diary/IconEmojiHappy.svg";
import IconEmojiSmiling from "../../assets/icons/diary/IconEmojiSmiling.svg";
import IconEmojiNeutral from "../../assets/icons/diary/IconEmojiNeutral.svg";
import IconEmojiSad from "../../assets/icons/diary/IconEmojiSad.svg";
import IconEmojiCrying from "../../assets/icons/diary/IconEmojiCrying.svg";

import ActionsBox from "../ActionsBox";
import MoodPill from "../pills/MoodPill";

const popoverOptions = [
  {
    value: "history",
    icon: IconHistory,
    label: "History",
    textColor: "dark.5",
  },
];

const moodPillData = [
  {
    icon: IconEmojiHappy,
    percentage: 60,
  },
  {
    icon: IconEmojiSmiling,
    percentage: 50,
  },
  {
    icon: IconEmojiNeutral,
    percentage: 50,
  },
  {
    icon: IconEmojiSad,
    percentage: 40,
  },
  {
    icon: IconEmojiCrying,
    percentage: 20,
  },
];

export default function MoodTrackerCard({ onPopoverClick }) {
  const moodPillInstances = moodPillData.map((mood) => (
    <MoodPill key={mood.icon} icon={mood.icon} percentage={mood.percentage} />
  ));

  return (
    <Card bg="gray.0" radius="lg" withBorder padding={24}>
      <Box pos="relative" ta="center">
        <Box>
          <Title order={2} mb={10}>
            Mood This Week
          </Title>
          <Text size="sm" c="dimmed">
            This mood tracker records your daily emotions throughout the week.
          </Text>
        </Box>

        <Box pos="absolute" top={0} right={0}>
          {" "}
          <ActionsBox
            onClick={(choice) => onPopoverClick(choice, "1")}
            options={popoverOptions}
          >
            <IconDotsVertical size={30} stroke={1.5} />
          </ActionsBox>
        </Box>

        <Stack mt={18}>{moodPillInstances}</Stack>

        <Box mt={18}>
          <Text lh={1.2}>
            Your mood this week has shown improvement compared to last week.
            Here's a detailed analytics report highlighting the positive changes
            in your mental well-being. <Anchor fw={500}>Click here</Anchor>
          </Text>
        </Box>
      </Box>
    </Card>
  );
}

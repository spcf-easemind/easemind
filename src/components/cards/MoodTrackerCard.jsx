import { Card, Stack } from "@mantine/core";
import MoodPill from "../pills/MoodPill";
import { MOOD_ATTRIBUTES } from "../../static/diary";

export default function MoodTrackerCard({ moodData, header, footer }) {
  const computedAttributes = MOOD_ATTRIBUTES.map((mood) => ({
    ...mood,
    percentage: moodData[mood.value],
  }));

  const moodPillInstances = computedAttributes.map((mood) => (
    <MoodPill key={mood.icon} icon={mood.icon} percentage={mood.percentage} />
  ));

  return (
    <Card bg="gray.0" radius="lg" withBorder padding={24}>
      {header}
      <Stack mt={18}>{moodPillInstances}</Stack>
      {footer}
    </Card>
  );
}

import {
  Card,
  Modal,
  Title,
  Text,
  Box,
  Group,
  SimpleGrid,
} from "@mantine/core";
import MoodTrackerCard from "../cards/MoodTrackerCard";

const comparisonAttributes = [
  {
    value: "lastWeek",
    header: "Last Week",
    data: [],
    date: "",
  },
  {
    value: "thisWeek",
    header: "This Week",
    data: [],
    date: "",
  },
];

export default function ComparisonModal({
  modal: { opened, onClose },
  comparisonData,
}) {
  const computedAttributes = comparisonAttributes.map((attrib) => {
    const date = Object.keys(comparisonData[attrib.value]).pop();

    return {
      ...attrib,
      data: comparisonData[attrib.value][date],
      date: date,
    };
  });

  const comparisonInstances = computedAttributes.map((attrib) => {
    const header = (
      <Title ta="center" order={3} mb={10}>
        {attrib.header}
      </Title>
    );

    const footer = (
      <Text mt={18} size="xs" ta="center" c="dimmed" lh={1.2}>
        {attrib.date}
      </Text>
    );

    return (
      <MoodTrackerCard
        key={attrib.header}
        moodData={attrib.data}
        header={header}
        footer={footer}
      />
    );
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size={1000}
      radius="md"
      padding={0}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Card padding={24}>
        <Box ta="center">
          <Title mb={8} order={3}>
            Mood Analysis Last Week and This Week
          </Title>
          <Text size="xs" c="dimmed" lh={1.2}>
            Here's a look at your mood data for this week compared to last week.
            The analysis reveals that your mood has significantly improved over
            the past week. This positive shift indicates that you are
            experiencing more uplifting emotions and fewer negative feelings
            than before. It's great to see the progress you've made!
          </Text>
        </Box>

        <SimpleGrid mt={18} cols={2}>
          {comparisonInstances}
        </SimpleGrid>
      </Card>
    </Modal>
  );
}

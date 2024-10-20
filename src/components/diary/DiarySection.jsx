import { Box, Stack, Title, Text, Anchor } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import MoodTrackerCard from "../../components/cards/diary/MoodTrackerCard";
import ActionsBox from "../ActionsBox";

import CreateButtonCard from "../../components/buttons/CreateButtonCard";
import DiaryCard from "../../components/cards/diary/DiaryCard";
import { HISTORY_OPTION } from "../../static/popover";

const popoverOptions = HISTORY_OPTION;

export default function DiarySection({
  diaryData,
  onPopoverClick,
  modal: { onComparisonClick, onDiaryLogClick },
}) {
  const header = (
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
    </Box>
  );

  const footer = (
    <Box mt={18} ta="center">
      <Text lh={1.2}>
        Your mood this week has shown improvement compared to last week. Here's
        a detailed analytics report highlighting the positive changes in your
        mental well-being.{" "}
        <Anchor onClick={onComparisonClick} fw={500}>
          Click here
        </Anchor>
      </Text>
    </Box>
  );

  return (
    <>
      <Box mt={18}>
        <MoodTrackerCard
          header={header}
          footer={footer}
          moodData={diaryData.moodData}
        />
      </Box>

      <Box mt={18}>
        <Title order={3} mb={10}>
          Thoughts to Treasure
        </Title>

        <CreateButtonCard
          onClick={() => onDiaryLogClick("create")}
          py={32}
          px={16}
          size="xl"
          imageSize={30}
        >
          New Thoughts
        </CreateButtonCard>
      </Box>

      <Box mt={18}>
        <Title order={3} mb={10}>
          Your Diaries
        </Title>

        <Stack>
          <DiaryCard onClick={onDiaryLogClick} />
        </Stack>
      </Box>
    </>
  );
}

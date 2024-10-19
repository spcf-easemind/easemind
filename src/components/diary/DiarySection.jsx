import { Box, Stack, Title } from "@mantine/core";
import MoodTrackerCard from "../../components/cards/MoodTrackerCard";
import CreateButtonCard from "../../components/buttons/CreateButtonCard";
import DiaryCard from "../../components/cards/DiaryCard";

export default function DiarySection() {
  return (
    <>
      <Box mt={18}>
        <MoodTrackerCard />
      </Box>

      <Box mt={18}>
        <Title order={3} mb={10}>
          Thoughts to Treasure
        </Title>

        <CreateButtonCard py={32} px={16} size="xl" imageSize={30}>
          New Thoughts
        </CreateButtonCard>
      </Box>

      <Box mt={18}>
        <Title order={3} mb={10}>
          Your Diaries
        </Title>

        <Stack>
          <DiaryCard />
        </Stack>
      </Box>
    </>
  );
}

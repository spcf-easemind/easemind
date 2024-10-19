import { Box, Paper, SimpleGrid, Stack, Title } from "@mantine/core";
import ToggleButton from "../../components/buttons/ToggleButton";
import MoodTrackerCard from "../../components/cards/MoodTrackerCard";
import { useState } from "react";
import CreateButtonCard from "../../components/buttons/CreateButtonCard";
import DiaryCard from "../../components/cards/DiaryCard";

const buttonOptions = [
  { value: "diary", label: "Diary" },
  { value: "recommended", label: "Recommended for you" },
];

export default function EndlessThoughtsDiaryPage() {
  const [active, setActive] = useState("diary");

  function handleButtonToggle(value) {
    setActive(value);
  }

  const buttonInstances = buttonOptions.map((button) => (
    <ToggleButton
      key={button.value}
      name={button.value}
      active={active}
      onClick={() => handleButtonToggle(button.value)}
    >
      {button.label}
    </ToggleButton>
  ));

  return (
    <Paper>
      <SimpleGrid cols={2}>{buttonInstances}</SimpleGrid>

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
    </Paper>
  );
}

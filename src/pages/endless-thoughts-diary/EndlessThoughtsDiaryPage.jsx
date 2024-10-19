import { Box, Paper, SimpleGrid } from "@mantine/core";
import ToggleButton from "../../components/buttons/ToggleButton";
import MoodTrackerCard from "../../components/cards/MoodTrackerCard";
import { useState } from "react";

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
    </Paper>
  );
}

import { Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import ToggleButton from "../../components/buttons/ToggleButton";
import DiarySection from "../../components/diary/DiarySection";
import RecommendedSection from "../../components/diary/RecommendedSection";
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

  const whichComponent =
    active === "diary" ? <DiarySection /> : <RecommendedSection />;

  return (
    <Paper>
      <SimpleGrid cols={2}>{buttonInstances}</SimpleGrid>

      {whichComponent}
    </Paper>
  );
}

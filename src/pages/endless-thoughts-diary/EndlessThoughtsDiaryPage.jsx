import { Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import ToggleButton from "../../components/buttons/ToggleButton";
import DiarySection from "../../components/diary/DiarySection";
import RecommendedSection from "../../components/diary/RecommendedSection";
import { useState } from "react";
import ComparisonModal from "../../components/modals/ComparisonModal";
import { useDisclosure } from "@mantine/hooks";

const buttonOptions = [
  { value: "diary", label: "Diary" },
  { value: "recommended", label: "Recommended for you" },
];

const diaryData = {
  moodData: {
    happy: 60,
    smiling: 50,
    neutral: 50,
    sad: 40,
    crying: 20,
  },
  comparisonData: {
    lastWeek: {
      "2024-01-01": {
        happy: 50,
        smiling: 40,
        neutral: 40,
        sad: 30,
        crying: 30,
      },
    },
    thisWeek: {
      "2024-01-08": {
        happy: 60,
        smiling: 50,
        neutral: 50,
        sad: 40,
        crying: 20,
      },
    },
  },
};

export default function EndlessThoughtsDiaryPage() {
  const [active, setActive] = useState("diary");

  const [opened, { toggle }] = useDisclosure();

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
    active === "diary" ? (
      <DiarySection
        diaryData={diaryData}
        modal={{ onComparisonClick: toggle }}
      />
    ) : (
      <RecommendedSection />
    );

  return (
    <Paper>
      <SimpleGrid cols={2}>{buttonInstances}</SimpleGrid>

      {whichComponent}

      <ComparisonModal
        comparisonData={diaryData.comparisonData}
        modal={{ opened, onClose: toggle }}
      />
    </Paper>
  );
}

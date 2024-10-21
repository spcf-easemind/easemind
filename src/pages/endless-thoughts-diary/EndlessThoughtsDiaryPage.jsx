import { Paper, SimpleGrid, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import DiaryLogModal from "../../components/modals/diary/DiaryLogModal";
import ComparisonModal from "../../components/modals/diary/ComparisonModal";
import ToggleButton from "../../components/buttons/ToggleButton";
import DiarySection from "../../components/diary/DiarySection";
import RecommendedSection from "../../components/diary/RecommendedSection";
import WarningModal from "../../components/modals/WarningModal";
import EmotionModal from "../../components/modals/diary/EmotionModal";

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

const warningDialogData = {
  title: "Delete Diary Log?",
  message: "Are you sure you want to delete this diary log?",
};

export default function EndlessThoughtsDiaryPage() {
  const [active, setActive] = useState("diary");
  const [buttonTitle, setButtonTitle] = useState("");

  const [opened, { toggle }] = useDisclosure();
  const [openedLog, { toggle: toggleLog }] = useDisclosure();
  const [openedWarning, { toggle: toggleWarning }] = useDisclosure();
  const [openedEmotion, { toggle: toggleEmotion }] = useDisclosure();

  useEffect(() => {
    if (openedEmotion === false) {
      toggleEmotion();
    }
  }, []);

  function onDeleteConfirm() {
    console.log("Delete confirmed");
  }

  function handleButtonToggle(value) {
    setActive(value);
  }

  function handleDiaryLogToggle(choice) {
    if (choice === "create") {
      setButtonTitle("create");
      toggleLog();
    } else if (choice === "edit") {
      setButtonTitle("edit");
      toggleLog();
    } else {
      toggleWarning();
    }
  }

  function handleSelectEmotion(value) {
    console.log("Emotion selected", value);
    toggleEmotion();
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
        modal={{
          onComparisonClick: toggle,
          onDiaryLogClick: handleDiaryLogToggle,
        }}
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

      <DiaryLogModal
        modal={{ opened: openedLog, onClose: toggleLog }}
        button={{ btnLabel: buttonTitle }}
      />

      <WarningModal
        modal={{ opened: openedWarning, onClose: toggleWarning }}
        form={{ ...warningDialogData }}
      >
        <Button onClick={toggleWarning} variant="light">
          Cancel
        </Button>
        <Button onClick={onDeleteConfirm} loading={false}>
          Delete
        </Button>
      </WarningModal>

      <EmotionModal
        modal={{ opened: openedEmotion, onClose: toggleEmotion }}
        onClick={handleSelectEmotion}
      />
    </Paper>
  );
}

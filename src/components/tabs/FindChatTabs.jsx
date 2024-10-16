import {
  Group,
  MultiSelect,
  Paper,
  Pill,
  ScrollArea,
  Tabs,
} from "@mantine/core";
import { useMemo, useState } from "react";

import PillButton from "../buttons/PillButton.jsx";

const tabsAttributes = [
  {
    value: "thoughts",
    label: "Thoughts",
    choices: [
      "Negative Self-Talk",
      "Catastrophizing",
      "Desire for Change",
      "Seeking Validation",
      "Fear of Judgment",
      "Feeling Trapped",
      "Questioning Reality",
      "Fear of Failure",
      "Feeling Unworthy",
      "Self-Sabotage",
      "Lack of Purpose",
      "Victim Mentality",
      "Fear of Intimacy",
      "Inability to Move On",
      "Fear of Rejection",
      "Decision Avoidance",
      "Comparisons",
      "Ruminating",
      "Existential Questions",
      "Distrust of Others",
    ],
  },
  {
    value: "emotions",
    label: "Emotions",
    choices: [
      "Sadness",
      "Anxiety",
      "Depression",
      "Loneliness",
      "Confusion",
      "Frustration",
      "Anger",
      "Overthinking",
      "Fear",
      "Guilt",
      "Shame",
      "Hopelessness",
      "Fatigue",
      "Numbness",
      "Despair",
      "Regret",
      "Desperation",
      "Insecurity",
      "Self-Doubt",
      "Disappointment",
      "Panic",
      "Boredom",
      "Vulnerability",
      "Future anxiety",
      "Jealousy",
      "Disgust",
      "Embarrassment",
      "Longing",
    ],
  },
  {
    value: "members",
    label: "Members",
    choices: ["Ease Companion", "Ease Buddy"],
  },
];

const pills = ["Negative Self Talk", "Sadness", "EaseCompanion"];

export default function FindChatTabs({ form }) {
  const [active, setActive] = useState("thoughts");
  const [selectedPill, setSelectedPill] = useState();

  function handleSelectPill(key, value) {
    form.setFieldValue(key, value);
    setSelectedPill(value);
  }

  const getFormPills = useMemo(() => {
    const formValues = form.getValues();
    const formPills = Object.keys(formValues)
      .map((key) =>
        formValues[key] === ""
          ? undefined
          : { keyId: key, value: formValues[key] }
      )
      .filter((value) => value !== undefined);
    return formPills;
  }, [form]);

  const tabHeader = tabsAttributes.map((tab) => {
    const isActive = tab.value === active;
    return (
      <Tabs.Tab
        px={24}
        key={tab.value}
        value={tab.value}
        size="lg"
        c={
          isActive
            ? "var(--mantine-primary-color-5)"
            : "var(--mantine-color-gray-6)"
        }
        fw={isActive ? 500 : 400}
        fz="md"
        onClick={() => setActive(tab.value)}
        active={active === tab.value}
      >
        {tab.label}
      </Tabs.Tab>
    );
  });

  const pillInstances = getFormPills.map((pill) => (
    <Pill
      styles={{
        root: {
          borderRadius: 5,
          backgroundColor: "var(--mantine-primary-color-5)",
          color: "white",
        },
      }}
      size="md"
      withRemoveButton
      key={pill.value}
      onRemove={() => handleSelectPill(pill.keyId, "")}
    >
      {pill.value}
    </Pill>
  ));

  const tabContent = tabsAttributes.map((tab) => {
    return (
      <Tabs.Panel value={tab.value} key={tab.value}>
        <Group gap={8}>
          {tab.choices.map((choice) => (
            <PillButton
              key={choice}
              active={selectedPill}
              name={choice}
              onSelect={(name) => handleSelectPill(tab.value, name)}
            />
          ))}
        </Group>
      </Tabs.Panel>
    );
  });
  return (
    <Tabs
      defaultValue={active}
      styles={{
        root: {
          borderStyle: "none", // Remove root border
        },
      }}
    >
      <Tabs.List justify="space-between">{tabHeader}</Tabs.List>
      <Paper mt={16} p={12} withBorder radius="lg" mih={100}>
        <Group gap={8}>{pillInstances}</Group>
      </Paper>

      <ScrollArea mt={16} h={200}>
        {tabContent}
      </ScrollArea>
    </Tabs>
  );
}

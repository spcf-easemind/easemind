import { Group, Paper, ScrollArea, Tabs } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import Pill from "../pills/Pill.jsx";

import PillButton from "../buttons/PillButton.jsx";
import { useEnumsStore } from "../../store/enums.js";
import { useShallow } from "zustand/shallow";

const tabsAttributes = [
  {
    value: "thoughts",
    label: "Thoughts",
    choices: [],
  },
  {
    value: "emotions",
    label: "Emotions",
    choices: [],
  },
  {
    value: "members",
    label: "Members",
    choices: [],
  },
];

export default function InterestTabs({ form }) {
  const { fetchInterestsEnumFn, interestsEnum } = useEnumsStore(
    useShallow((state) => ({
      fetchInterestsEnumFn: state.fetchInterestsEnum,
      interestsEnum: state.interests,
    }))
  );

  useEffect(() => {
    fetchInterestsEnumFn();
  }, []);

  const enumArrays = useMemo(() => {
    const attributes = tabsAttributes.map((tab) => ({
      ...tab,
      choices: Array.isArray(interestsEnum[tab.value])
        ? interestsEnum[tab.value].map((choice) => ({
            key: choice.key,
            value: choice.data.name,
          }))
        : [],
    }));
    return attributes;
  }, [interestsEnum]);

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
      name={pill.value}
      onRemove={() => handleSelectPill(pill.keyId, "")}
    ></Pill>
  ));

  const tabContent = enumArrays.map((tab) => {
    return (
      <Tabs.Panel value={tab.value} key={tab.value}>
        <Group gap={8}>
          {tab.choices.map((choice) => (
            <PillButton
              key={choice.key}
              data-active={selectedPill === choice.value || undefined}
              name={choice.value}
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

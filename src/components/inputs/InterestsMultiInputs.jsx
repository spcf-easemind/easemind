import MultiInputsCard from "../cards/MultiInputsCard";
import Pill from "../pills/Pill";
import PillButton from "../buttons/PillButton";
import { Group, Tabs } from "@mantine/core";
import { useEnumsStore } from "../../store/enums";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo, useState } from "react";
import classes from "./InterestsMultiInputs.module.css";
import _ from "lodash";

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

export default function InterestsMultiInputs({form: { form }}) {
  // Enums
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
            tab: tab.value,
            key: choice.key,
            value: choice.data.name,
          }))
        : [],
    }));
    return attributes;
  }, [interestsEnum]);

  // Active Pills
  const [active, setActive] = useState("thoughts");
  const [selectedPills, setSelectedPills] = useState([]);

  useEffect(() => {
    if (form.getValues().initialCategories) {
      setSelectedPills([...form.getValues().initialCategories]);
    }
  }, [form]);

  function handleSelectPill(choice) {
    const isSelected = selectedPills.some((pill) => _.isEqual(pill, choice));
    const updatedPills = isSelected
      ? selectedPills.filter((pill) => !_.isEqual(pill, choice))
      : [...selectedPills, choice];

    form.setFieldValue("initialCategories", updatedPills);
    setSelectedPills(updatedPills);
  }

  const getInterests = form.getValues().initialCategories;

  // Interest Multi Inputs
  const interestsInputs = () => {
    const header = (
      <Group gap={8}>
        {getInterests.map((choice) => (
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
            key={choice.key}
            onRemove={() => handleSelectPill(choice)}
            name={choice.value}
          ></Pill>
        ))}
      </Group>
    );

    const tabs = tabsAttributes.map((tab) => {
      const isActive = tab.value === active;
      return (
        <Tabs.Tab
          px={16}
          key={tab.value}
          value={tab.value}
          size="md"
          c={
            isActive
              ? "var(--mantine-primary-color-5)"
              : "var(--mantine-color-gray-6)"
          }
          className={classes.tabStyling}
          fw={isActive ? 500 : 400}
          onClick={() => setActive(tab.value)}
          active={active === tab.value}
        >
          {tab.label}
        </Tabs.Tab>
      );
    });

    const panels = enumArrays.map((tab) => {
      return (
        <Tabs.Panel value={tab.value} key={tab.value} mt={16}>
          <Group gap={8}>
            {tab.choices.map((choice) => {
              const isActive = selectedPills.some((pill) =>
                _.isEqual(pill, choice)
              );
              return (
                <PillButton
                  key={choice.key}
                  data-active={isActive || undefined}
                  name={choice.value}
                  onSelect={() => handleSelectPill(choice)}
                />
              );
            })}
          </Group>
        </Tabs.Panel>
      );
    });
    return (
      <MultiInputsCard
        formError={form.errors.initialCategories}
        header={header}
      >
        <Tabs
          defaultValue={active}
          styles={{
            root: {
              "--tabs-list-border-width": "0px",
            },
          }}
        >
          <Tabs.List justify="center">{tabs}</Tabs.List>
          {panels}
        </Tabs>
      </MultiInputsCard>
    );
  };

  return interestsInputs();
}

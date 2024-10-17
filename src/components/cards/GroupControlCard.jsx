import {
  ActionIcon,
  Box,
  Card,
  Title,
  Text,
  Stack,
  TextInput,
  Textarea,
  Group,
  Tabs,
  Button,
} from "@mantine/core";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
// import Dropzone from "../Dropzone.jsx";
// Components
import PhotoControlButton from "../buttons/PhotoControlButton";
import MultiInputsCard from "./MultiInputsCard";
import Pill from "../pills/Pill";
import PillButton from "../buttons/PillButton";
import CheckboxList from "../CheckboxList.jsx";

import { useEffect, useMemo, useState } from "react";
import { useEnumsStore } from "../../store/enums";
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

const new_friends = [
  {
    id: 1,
    name: "Alexander Camaddo",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
  },
  {
    id: 2,
    name: "Gabriel Gatbonton",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
  },
];

export default function GroupControlCard({ form, onPhotoControlClick }) {
  const { fetchInterestsEnumFn, interestsEnum } = useEnumsStore(
    useShallow((state) => ({
      fetchInterestsEnumFn: state.fetchInterestsEnum,
      interestsEnum: state.interests,
    }))
  );

  useEffect(() => {
    fetchInterestsEnumFn();
  }, [fetchInterestsEnumFn]);

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

  const getInterests = useMemo(() => {
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

  const interestsInputs = () => {
    const header = (
      <Group gap={8}>
        {getInterests.map((item) => (
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
            key={item.value}
            onRemove={() => handleSelectPill(item.keyId, "")}
            name={item.value}
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
        <Tabs.Panel value={tab.value} key={tab.value}>
          <Group gap={8}>
            {tab.choices.map((choice) => (
              <PillButton
                key={choice.key}
                active={selectedPill}
                name={choice.value}
                onSelect={(name) => handleSelectPill(tab.value, name)}
              />
            ))}
          </Group>
        </Tabs.Panel>
      );
    });
    return (
      <MultiInputsCard header={header}>
        <Tabs defaultValue={active}>
          <Tabs.List justify="center">{tabs}</Tabs.List>
          {panels}
        </Tabs>
      </MultiInputsCard>
    );
  };

  const membersInputs = () => {
    const icon = <IconSearch size={20} stroke={1.5} />;
    const header = <TextInput leftSection={icon} variant="transparent" />;
    const checkboxes = (
      <CheckboxList
        label="Engaged with these people"
        checkboxes={new_friends}
      />
    );
    return <MultiInputsCard header={header}>{checkboxes}</MultiInputsCard>;
  };

  return (
    <Card withBorder bg="gray.0">
      <Box ta="center" pos="relative">
        <ActionIcon
          variant="transparent"
          color="black"
          pos="absolute"
          top={0}
          left={0}
        >
          <IconChevronLeft size={30} stroke={1.5} />
        </ActionIcon>

        <Box px={45}>
          <Title order={2} mb={10}>
            Create Group
          </Title>
          <Text size="sm">
            Create a group to connect with others, share experiences, and build
            a supportive community where everyone can grow and thrive together.
          </Text>
        </Box>
      </Box>

      <Stack mt={24} align="center" px={45}>
        <PhotoControlButton onClick={onPhotoControlClick} />

        <form style={{ width: "100%" }}>
          <Stack>
            <TextInput placeholder="Name your group" />

            <Textarea rows={4} placeholder="Description..." />

            {interestsInputs()}

            {membersInputs()}

            <Button type="submit" fullWidth size="md">
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}

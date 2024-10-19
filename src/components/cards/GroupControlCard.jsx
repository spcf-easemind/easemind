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
import classes from "./GroupControlCard.module.css";
import _ from "lodash";
// Components
import PhotoControlButton from "../buttons/PhotoControlButton";
import MultiInputsCard from "./MultiInputsCard";
import Pill from "../pills/Pill";
import PillButton from "../buttons/PillButton";
import CheckboxList from "../CheckboxList.jsx";

// Hooks
import { useEffect, useMemo, useState } from "react";
import { useEnumsStore } from "../../store/enums";
import { useShallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";

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

export default function GroupControlCard({
  form: { form, onSubmit },
  header: { title, description },
  button: { btnLabel },
  enums: { users },
  onPhotoControlClick,
}) {
  const navigate = useNavigate();

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

  // Members Multi Inputs
  const [searchTerm, setSearchTerm] = useState("");
  const usersChecked = form.getValues().initialMembers;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleCheckboxSelect(value) {
    form.setFieldValue("initialMembers", value);
  }

  const membersInputs = () => {
    const icon = <IconSearch size={20} stroke={1.5} />;
    const header = (
      <TextInput
        leftSection={icon}
        variant="transparent"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search users"
      />
    );

    const checkboxes = (
      <CheckboxList
        label="Engaged with these people"
        checkboxes={filteredUsers}
        onChange={(value) => handleCheckboxSelect(value)}
        value={usersChecked}
      />
    );

    return (
      <MultiInputsCard formError={form.errors.initialMembers} header={header}>
        {checkboxes}
      </MultiInputsCard>
    );
  };

  const savedImage =
    form.getValues().groupProfilePath !== ""
      ? form.getValues().groupProfilePath
      : null;

  return (
    <Card withBorder bg="gray.0">
      <Box ta="center" pos="relative">
        <ActionIcon
          variant="transparent"
          color="black"
          pos="absolute"
          top={0}
          left={0}
          onClick={() => navigate("/owned-groups")}
        >
          <IconChevronLeft size={30} stroke={1.5} />
        </ActionIcon>

        <Box px={45}>
          <Title order={2} mb={10}>
            {title}
          </Title>
          <Text size="sm">{description}</Text>
        </Box>
      </Box>

      <Stack mt={24} align="center" px={45}>
        <PhotoControlButton
          formError={form.errors.groupProfilePath}
          image={savedImage}
          onClick={onPhotoControlClick}
        />

        <form style={{ width: "100%" }}>
          <Stack>
            <TextInput
              placeholder="Name your group"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />

            <Textarea
              rows={4}
              placeholder="Description..."
              key={form.key("description")}
              {...form.getInputProps("description")}
            />

            {interestsInputs()}

            {membersInputs()}

            <Button
              onClick={form.onSubmit(onSubmit)}
              type="submit"
              fullWidth
              size="md"
            >
              {btnLabel}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}

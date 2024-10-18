import {
  Card,
  Box,
  ActionIcon,
  Title,
  Text,
  Stack,
  TextInput,
  Textarea,
  Tabs,
  Group,
  Button,
  Popover,
  UnstyledButton,
  Image,
} from "@mantine/core";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEnumsStore } from "../../store/enums";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import classes from "./PostControlCard.module.css";

import IconEmoticon from "../../assets/icons/input/IconEmoticon.svg";
import IconImage from "../../assets/icons/input/IconImage.svg";
import IconPaperClip from "../../assets/icons/input/IconPaperClip.svg";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { REMOVED_EMOJIS } from "../../static/chat";

import Pill from "../pills/Pill";
import PillButton from "../buttons/PillButton";
import MultiInputsCard from "./MultiInputsCard";

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

const icons = [
  {
    name: "emoticon",
    svg: IconEmoticon,
    action: "",
  },
  {
    name: "image",
    svg: IconImage,
    action: "media",
  },
  {
    name: "paper-clip",
    svg: IconPaperClip,
    action: "file",
  },
];

export default function PostControlCard({
  form: { form, onSubmit },
  header: { title, description },
  button: { btnLabel },
}) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef();
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

  function handleSelectEmoji(emoji) {
    const cursor = inputRef.current.selectionStart;
    inputRef.current.value =
      inputRef.current.value.slice(0, cursor) +
      emoji.native +
      inputRef.current.value.slice(cursor);

    setCursorPosition(cursor + emoji.native.length);

    form.setFieldValue("description", inputRef.current.value);
  }

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  }, [cursorPosition]);

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

  function handleSelectPill(choice) {
    const isSelected = selectedPills.includes(choice);

    const updatedPills = isSelected
      ? selectedPills.filter((pill) => pill !== choice)
      : [...selectedPills, choice];

    form.setFieldValue("initialCategories", updatedPills);
    setSelectedPills(updatedPills);
  }

  const getInterests = form.getValues().initialCategories;

  // Interest Multi Inputs
  const interestsInputs = () => {
    const header = (
      <Group gap={8}>
        <IconSearch size={25} stroke={1.5} />
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
              const isActive = selectedPills.includes(choice);
              console.log(isActive);
              return (
                <PillButton
                  key={choice.key}
                  active={isActive}
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

  const groupIcons = (
    <Group justify="center" wrap="no-wrap">
      {icons.map((icon) =>
        icon.name === "emoticon" ? (
          <Popover.Target key={icon.name}>
            <UnstyledButton>
              <Image src={icon.svg} />
            </UnstyledButton>
          </Popover.Target>
        ) : (
          <UnstyledButton
            onClick={() => {
              handleIconClick(icon.action);
            }}
            key={icon.name}
          >
            <Image src={icon.svg} />
          </UnstyledButton>
        )
      )}
    </Group>
  );

  return (
    <Card radius="lg" bg="gray.0" withBorder>
      <Box ta="center" pos="relative">
        <ActionIcon
          variant="transparent"
          color="black"
          pos="absolute"
          top={0}
          left={0}
          onClick={() => navigate(-1)}
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
        <form style={{ width: "100%" }}>
          <Stack>
            <TextInput
              placeholder="Name your group"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />

            <Card radius="md" withBorder>
              <Textarea
                rows={4}
                placeholder="Description..."
                key={form.key("description")}
                ref={inputRef}
                styles={{
                  input: {
                    border: "none",
                  },
                }}
                {...form.getInputProps("description")}
              />
              <Popover trapFocus position="left">
                <Group>{groupIcons}</Group>
                <Popover.Dropdown>
                  <Picker
                    data={data}
                    onEmojiSelect={handleSelectEmoji}
                    emojiVersion="15"
                    exceptEmojis={REMOVED_EMOJIS}
                  />
                </Popover.Dropdown>
              </Popover>
            </Card>

            {interestsInputs()}

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

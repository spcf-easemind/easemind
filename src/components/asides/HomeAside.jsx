import {
  Title,
  Anchor,
  ScrollArea,
  Stack,
  Box,
  Flex,
  SimpleGrid,
} from "@mantine/core";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import QuoteBox from "./QuoteBox";
import PillButton from "../buttons/PillButton.jsx";
import GroupMemberCard from "../cards/groups/GroupMemberCard.jsx";
import classes from "./HomeAside.module.css";

import {
  PILL_ATTRIBUTES,
  SAMPLE_DAILY_QUOTES,
  SUGGESTED_SECTION_ATTRIBUTES,
} from "../../static/aside";
import TaskCard from "../cards/TaskCard.jsx";
import CreateButtonCard from "../buttons/CreateButtonCard.jsx";
import { useDisclosure } from "@mantine/hooks";
import TaskModal from "../modals/diary/TaskModal.jsx";

const withDailyTasksRoutes = ["/endless-thoughts-diary"];

export default function HomeAside() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTag, setActiveTag] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [opened, { toggle }] = useDisclosure();

  function handleSelectTag(name) {
    activeTag !== name ? setActiveTag(name) : setActiveTag("");
  }

  const pillContent = PILL_ATTRIBUTES.filter((item) =>
    withDailyTasksRoutes.includes(location.pathname)
      ? item.value !== "trendingTopics"
      : true
  ).map((attribute) => {
    return (
      <Box mt={15} key={attribute.value}>
        <Title order={3} mb={15}>
          {attribute.label}
        </Title>
        <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
          {attribute.choices.map((choice) => (
            <PillButton
              name={choice}
              key={choice}
              onSelect={handleSelectTag}
              data-active={activeTag === choice || undefined}
            />
          ))}
        </SimpleGrid>
      </Box>
    );
  });

  function handleToggleModal(title) {
    if (title === "create" || title === "edit") {
      setModalTitle(title);
      toggle();
    } else {
      // Delete Function
    }
  }

  const dailyTasksContent = withDailyTasksRoutes.includes(
    location.pathname
  ) && (
    <Box mt={15}>
      <Title order={3} mb={15}>
        Daily Tasks
      </Title>

      <Stack>
        <TaskCard onPopoverClick={handleToggleModal} />

        <CreateButtonCard onClick={() => handleToggleModal("create")}>
          Add Task
        </CreateButtonCard>
      </Stack>
    </Box>
  );

  function handleAnchorClick(route) {
    return navigate(route);
  }

  const suggestedContent = SUGGESTED_SECTION_ATTRIBUTES.map((attribute) => {
    return (
      <Box mt={15} key={attribute.value}>
        <Title order={3} mb={15}>
          {attribute.label}
        </Title>
        <Stack gap={10} mb={8}>
          {attribute.choices.map((choice) => (
            <GroupMemberCard
              className={classes.groupCard}
              name={choice.userName}
              image={choice.userImage}
              role={choice.text}
            />
          ))}
        </Stack>
        <Flex justify="center">
          <Anchor
            underline="never"
            onClick={() => handleAnchorClick(attribute.link)}
          >
            See More
          </Anchor>
        </Flex>
      </Box>
    );
  });

  return (
    <>
      <ScrollArea type="scroll" scrollbarSize={6}>
        <QuoteBox {...SAMPLE_DAILY_QUOTES} />
        {dailyTasksContent}
        {pillContent}
        {suggestedContent}
      </ScrollArea>

      <TaskModal modal={{ opened, onClose: toggle, title: modalTitle }} />
    </>
  );
}

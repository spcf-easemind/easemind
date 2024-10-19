import {
  Title,
  Group,
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
import ChatList from "../chat/ChatList.jsx";

import {
  PILL_ATTRIBUTES,
  SAMPLE_DAILY_QUOTES,
  SUGGESTED_SECTION_ATTRIBUTES,
} from "../../static/aside";
import TaskCard from "../cards/TaskCard.jsx";
import CreateButtonCard from "../buttons/CreateButtonCard.jsx";

const withDailyTasksRoutes = ["/endless-thoughts-diary"];

export default function HomeAside() {
  const [activeTag, setActiveTag] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  const dailyTasksContent = withDailyTasksRoutes.includes(
    location.pathname
  ) && (
    <Box mt={15}>
      <Title order={3} mb={15}>
        Daily Tasks
      </Title>

      <Stack>
        <TaskCard />

        <CreateButtonCard>Add Task</CreateButtonCard>
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
            <ChatList {...choice} key={choice.id} />
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
    <ScrollArea type="scroll" scrollbarSize={6}>
      <QuoteBox {...SAMPLE_DAILY_QUOTES} />
      {dailyTasksContent}
      {pillContent}
      {suggestedContent}
    </ScrollArea>
  );
}

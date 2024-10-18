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
import { useNavigate } from "react-router-dom";

import QuoteBox from "./QuoteBox";
import PillButton from "../buttons/PillButton.jsx";
import ChatList from "../chat/ChatList.jsx";

import {
  PILL_ATTRIBUTES,
  SAMPLE_DAILY_QUOTES,
  SUGGESTED_SECTION_ATTRIBUTES,
} from "../../static/aside";

export default function HomeAside() {
  const [activeTag, setActiveTag] = useState("");
  const navigate = useNavigate();

  function handleSelectTag(name) {
    activeTag !== name ? setActiveTag(name) : setActiveTag("");
  }

  const pillContent = PILL_ATTRIBUTES.map((attribute) => {
    const fixedPillWidth = 100;
    return (
      <Box mt={15} key={attribute.value}>
        <Title order={3} mb={15}>
          {attribute.label}
        </Title>
        <SimpleGrid cols={3} spacing="xs">
          {attribute.choices.map((choice) => (
            <PillButton
              name={choice}
              key={choice}
              onSelect={handleSelectTag}
              active={activeTag}
              pillWidth={fixedPillWidth}
            />
          ))}
        </SimpleGrid>
      </Box>
    );
  });

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
      {pillContent}
      {suggestedContent}
    </ScrollArea>
  );
}

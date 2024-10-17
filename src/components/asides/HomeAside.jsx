import {
  Title,
  Group,
  Anchor,
  ScrollArea,
  Stack,
  Box,
  Flex,
} from "@mantine/core";

import QuoteBox from "./QuoteBox";
import PillButton from "../buttons/PillButton.jsx";

import {
  PILL_ATTRIBUTES,
  SAMPLE_DAILY_QUOTES,
  SUGGESTED_SECTION_ATTRIBUTES,
} from "../../static/aside";
import ChatList from "../chat/ChatList.jsx";
import { useState } from "react";


export default function HomeAside() {
  const [activeTag, setActiveTag] = useState("");

  function handleSelectTag(name) {
    setActiveTag(name)
  }

  const pillContent = PILL_ATTRIBUTES.map((attribute) => {
    return (
      <Box mt={15}>
        <Title order={3} mb={15}>
          {attribute.label}
        </Title>
        <Group gap={8}>
          {attribute.choices.map((choice) => (
            <PillButton name={choice} key={choice} onSelect={handleSelectTag} active={activeTag}/>
          ))}
        </Group>
      </Box>
    );
  });
  
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
          <Anchor underline="never" href={attribute.link}>
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

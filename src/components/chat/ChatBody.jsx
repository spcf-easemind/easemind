import { Paper, ScrollArea, Stack } from "@mantine/core";

import ChatContainer from "./ChatContainer.jsx";
import { useEffect, useRef } from "react";

export default function ChatBody({ data, ...props }) {
  const scrollViewport = useRef();

  const scrollToBottom = () => {
    if (scrollViewport.current) {
      scrollViewport.current.scrollTo({
        top: scrollViewport.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const instances = data.map((instance) => {
    return <ChatContainer key={instance.id} data={instance} />;
  });

  return (
    <ScrollArea {...props} viewportRef={scrollViewport} scrollHideDelay={0}>
      <Paper>
        <Stack justify="end">{instances}</Stack>
      </Paper>
    </ScrollArea>
  );
}

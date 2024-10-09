import { Paper, Stack } from "@mantine/core";

import ChatContainer from "./ChatContainer.jsx";
import { useEffect, useRef } from "react";

export default function ChatBody({ data, ...props }) {
  const scrollViewport = useRef();

  const scrollToBottom = () => {
    if (scrollViewport.current) {
      scrollViewport.current.scrollTo({
        top: scrollViewport.current.scrollHeight,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const instances = data.map((instance) => (
    <ChatContainer key={instance.id} data={instance} />
  ));

  return (
    <Paper
      {...props}
      style={{
        overFlowY: "auto",
      }}
      ref={scrollViewport}
    >
      <Stack justify="end" h="100%">
        {instances}
      </Stack>
    </Paper>
  );
}

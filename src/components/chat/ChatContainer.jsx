import { Flex, Avatar, Text, Group, Stack } from "@mantine/core";

import ChatCard from "./ChatCard.jsx";
import ChatBox from "./ChatBox.jsx";
import ImageTruncation from "../buttons/ImageTruncation.jsx";
import { useAuthenticationStore } from "../../store/authentication.js";
import { format } from "date-fns";
import { useChatStore } from "../../store/chat.js";
import { useParams } from "react-router-dom";

export default function ChatContainer({ data }) {
  const { chatRef } = useParams();
  const userkey = useAuthenticationStore((state) => state.user.data.key);
  const getUserData = useChatStore((state) => state.getUserData);

  const userLoggedIn = data.userId === userkey;

  const { justify, direction, withMessageData } = userLoggedIn
    ? { justify: "end", direction: "row-reverse", withMessageData: false }
    : { justify: "start", direction: "row", withMessageData: true };

  const messageInstances = () => {
    if (data.type === "text") {
      return <ChatCard text={data.message} />;
    } else if (data.type === "image") {
      return (
        <ImageTruncation isLoggedIn={userLoggedIn} images={data.fileURL} />
      );
    } else if (data.type === "document") {
      return <ChatCard text={data.fileURL} />;
    }
  };

  const computedCreatedAt = () => {
    const date = new Date(data.time);
    return format(date, "h:mm a");
  };

  const userAlgo = (userKey) => {
    const users = getUserData(chatRef);
    const [userId] = Object.keys(users).filter((key) => key !== userKey);
    return users[userId];
  };

  return (
    <Flex gap={16} align="end" justify={justify} direction={direction}>
      {withMessageData && (
        <Avatar src={userAlgo(chatRef).image} w={36} h={36} radius="md" />
      )}

      <ChatBox mb={2} maw="60%">
        {withMessageData && (
          <Group gap={8} ml={6} mb={4}>
            <Text size="sm" fw={500}>
              {userAlgo(chatRef).name}
            </Text>
            <Text size="sm" c="dimmed" fw={400}>
              {computedCreatedAt()}
            </Text>
          </Group>
        )}
        <Stack align={justify} gap={8}>
          {messageInstances()}
        </Stack>
      </ChatBox>
    </Flex>
  );
}

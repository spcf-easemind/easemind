import { Flex, Image, Text, Group, Stack } from "@mantine/core";

import ChatCard from "./ChatCard.jsx";
import ChatBox from "./ChatBox.jsx";
import ImageTruncation from "../buttons/ImageTruncation.jsx";
import { useAuthenticationStore } from "../../store/authentication.js";
import { format } from "date-fns";

export default function ChatContainer({ data }) {
  const userkey = useAuthenticationStore((state) => state.user.data.key);

  const { justify, direction, withMessageData } =
    data.userId === userkey
      ? { justify: "end", direction: "row-reverse", withMessageData: false }
      : { justify: "start", direction: "row", withMessageData: true };

  const messageInstances = () => {
    if (data.type === "text") {
      return <ChatCard text={data.message} />;
    } else if (data.type === "image") {
      return <ImageTruncation images={data.images} />;
    }
  };

  const computedCreatedAt = () => {
    const date = new Date(data.time);
    return format(date, "h:mm a");
  };

  return (
    <Flex gap={16} align="end" justify={justify} direction={direction}>
      {withMessageData && (
        <Image src={data.userImage} w={36} h={36} radius="md" />
      )}

      <ChatBox mb={2} maw="60%">
        {withMessageData && (
          <Group gap={8} ml={6} mb={4}>
            <Text size="sm" fw={500}>
              {data.name}
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

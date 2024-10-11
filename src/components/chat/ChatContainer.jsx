import { Flex, Image, Text, Group, Stack } from "@mantine/core";

import HappyImage from "../../assets/HappyImage.jpg";
import ChatCard from "./ChatCard.jsx";
import ChatBox from "./ChatBox.jsx";
import ImageTruncation from "../buttons/ImageTruncation.jsx";

export default function ChatContainer({ data }) {
  const user = "Gabriel Gatbonton";

  const { justify, direction, withMessageData } =
    data.name === user
      ? { justify: "end", direction: "row-reverse", withMessageData: false }
      : { justify: "start", direction: "row", withMessageData: true };

  const messageInstances = () => {
    if (data.message) {
      return data.message.map((message) => (
        <ChatCard key={message} text={message} />
      ));
    } else if (data.images) {
      return <ImageTruncation images={data.images} />;
    }
  };

  // if (item.message) {
  //   return data.message.map((message) => (
  //     <ChatCard key={message} text={message} />
  //   ));
  // } else if (daitemta.images) {
  //   return <ImageTruncation images={data.images} />;
  // }

  return (
    <Flex gap={16} align="end" justify={justify} direction={direction}>
      {withMessageData && <Image src={HappyImage} w={36} h={36} radius="md" />}

      <ChatBox mb={2} maw="60%">
        {withMessageData && (
          <Group gap={8} ml={6} mb={4}>
            <Text size="sm" fw={500}>
              Masipag
            </Text>
            <Text size="sm" c="dimmed" fw={400}>
              12:00 am
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

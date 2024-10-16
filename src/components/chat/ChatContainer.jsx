import {
  Flex,
  Avatar,
  Text,
  Group,
  Stack,
  Anchor,
  Overlay,
} from "@mantine/core";

import ChatCard from "./ChatCard.jsx";
import ChatBox from "./ChatBox.jsx";
import ImageTruncation from "../buttons/ImageTruncation.jsx";
import { useAuthenticationStore } from "../../store/authentication.js";
import { format } from "date-fns";
import { useChatStore } from "../../store/chat.js";
import { useParams } from "react-router-dom";
import {
  IconFileFilled,
  IconLink,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { formatters } from "../../utils/formatters.js";
import { useDialogStore } from "../../store/dialog.js";

import classes from "../grid/PhotoList.module.css";

export default function ChatContainer({ data }) {
  const { chatRef } = useParams();
  const userkey = useAuthenticationStore((state) => state.user.data.key);
  const getUserData = useChatStore((state) => state.getUserData);
  const toggleGalleryFn = useDialogStore((state) => state.toggleGallery);

  const userLoggedIn = data.userId === userkey;

  const { justify, direction, withMessageData } = userLoggedIn
    ? { justify: "end", direction: "row-reverse", withMessageData: false }
    : { justify: "start", direction: "row", withMessageData: true };

  const messageInstances = () => {
    if (data.type === "text") {
      return <ChatCard text={data.message} />;
    } else if (data.type === "image") {
      return <ImageTruncation fileURL={data.fileURL[0]} />;
    } else if (data.type === "document") {
      const fileURLComponent = (
        <Anchor href={data.fileURL[0]} download={data.fileName}>
          <Group align="center" gap={8}>
            <IconFileFilled size={20} stroke={1.5} />
            <Text size="md">{data.fileName}</Text>
          </Group>
        </Anchor>
      );
      return <ChatCard text={fileURLComponent} />;
    } else if (data.type === "link") {
      const LinkComponent = (
        <Anchor href={formatters.formatUrl(data.message)} target="_blank">
          <Group align="center" gap={8}>
            <IconLink size={20} stroke={1.5} />
            <Text size="md">{data.message}</Text>
          </Group>
        </Anchor>
      );
      return <ChatCard text={LinkComponent} />;
    } else if (data.type === "video") {
      const VideoComponent = (
        <Anchor pos="relative" href={data.fileURL[0]} target="_blank">
          <ImageTruncation fileURL={data.thumbnailURL} />
          <Overlay radius="lg" className={classes.overlayStyling}>
            <Group justify="center" align="center" h="100%">
              <IconPlayerPlayFilled color="white" size={40} stroke={1.5} />
            </Group>
          </Overlay>
        </Anchor>
      );
      return VideoComponent;
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

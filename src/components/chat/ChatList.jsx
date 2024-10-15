import {
  UnstyledButton,
  Image,
  Badge,
  Title,
  Text,
  Box,
  Group,
  Avatar,
} from "@mantine/core";

import classes from "./ChatList.module.css";
import { format } from "date-fns";

export default function ChatList({
  userName,
  userImage,
  text,
  time,
  unread,
  id,
  onSelectChat,
  activeChat,
}) {
  const isBadge = unread ? (
    <Badge size="md" circle color="var(--mantine-primary-color-4)" ml={20}>
      {unread}
    </Badge>
  ) : null;

  const formattedTime = (time) => {
    const date = new Date(time);
    return format(date, "kk:mm");
  };

  return (
    <UnstyledButton
      w="100%"
      p={10}
      className={classes.chatStyling}
      data-active={activeChat === id || undefined}
      key={id}
      onClick={() => onSelectChat(id)}
    >
      <Group align="center">
        <Avatar src={userImage} w={55} h={55} radius={10} />
        <Box flex={1}>
          <Title order={5} lineClamp={1} fw={500}>
            {userName}
          </Title>
          <Text lineClamp={1} c="gray" size="sm">
            {text ? text : "No messages yet"}
          </Text>
        </Box>
        <Box h={40} w={40}>
          <Text c="gray" size="sm" align="right" truncate="end">
            {formattedTime(time)}
          </Text>
          {isBadge}
        </Box>
      </Group>
    </UnstyledButton>
  );
}

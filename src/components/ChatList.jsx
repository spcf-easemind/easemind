import {
  UnstyledButton,
  Image,
  Badge,
  Title,
  Text,
  Flex,
  Box,
  Group,
} from "@mantine/core";

export default function ChatList({ userName, userImage, text, time, unread }) {
  return (
    <UnstyledButton w="100%" py={8}>
      <Group align="center">
        <Image src={userImage} />
        <Box flex={1}>
          <Title size="h4" lineClamp={1}>{userName}</Title>
          <Text lineClamp={1} c="gray" size="sm">
            {text}
          </Text>
        </Box>
        <Box w={40}>
          <Text c="gray" size="sm">
            {time}
          </Text>
          <Badge size="md" circle>
            {unread}
          </Badge>
        </Box>
      </Group>
    </UnstyledButton>
  );
}

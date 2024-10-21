import {
  Title,
  Box,
  Group,
  Text,
  Flex,
  Anchor,
  UnstyledButton,
  Image,
} from "@mantine/core";

import Pill from "../pills/Pill";
import UserProfileIndicator from "../UserProfileIndicator";
import ActionsBox from "../ActionsBox";
import { IconDotsVertical } from "@tabler/icons-react";

export default function PostSection({
  userProfileImage,
  userName,
  userRole,
  postTitle,
  postContent,
  tags,
  hashtags,
  onOpen,
  options,
  isModal,
  profileIndicatorStyling,
}) {
  const postContentFormat = !isModal ? (
    <>
      <Anchor
        underline="never"
        order={3}
        mt={5}
        c="var(--mantine-color-dark-10)"
        fw={700}
        style={{ fontSize: "25px" }}
        lineClamp={1}
        onClick={() => {
          onOpen();
        }}
      >
        {postTitle}
      </Anchor>
      <Text size="sm" my={5} lineClamp={3}>
        {postContent}
      </Text>
      <Group>
        {tags.map((tag) => (
          <Pill name={tag} key={tag} />
        ))}
      </Group>
      <Group mt={10}>
        {hashtags.map((item) => (
          <Anchor size="sm" fw={500} key={item}>
            #{item}
          </Anchor>
        ))}
      </Group>
    </>
  ) : (
    <>
      <Title underline="never" order={2} mb={10}>
        {postTitle}
      </Title>
      <Text size="sm" mb={10} style={{ textAlign: "justify" }}>
        {postContent}
      </Text>
      <Title order={5} mb={10}>
        Topics Related
      </Title>
      <Group>
        {tags.map((tag) => (
          <Pill name={tag} key={tag} />
        ))}
      </Group>
      <Group mt={10}>
        {hashtags.map((item) => (
          <Anchor size="sm" fw={500} key={item}>
            #{item}
          </Anchor>
        ))}
      </Group>
    </>
  );
  return (
    <>
      {!isModal ? (
        <Flex justify="space-between">
          <UserProfileIndicator
            profile={userProfileImage}
            name={userName}
            role={userRole}
            {...profileIndicatorStyling}
          />
          <Flex align="flex-start">
            <ActionsBox options={options}>
              <UnstyledButton>
                <IconDotsVertical size={30} stroke={1.5} />
              </UnstyledButton>
            </ActionsBox>
          </Flex>
        </Flex>
      ) : null}
      <Box my={5}>{postContentFormat}</Box>
    </>
  );
}

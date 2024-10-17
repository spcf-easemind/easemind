import {
  Title,
  Box,
  Group,
  Avatar,
  Text,
  Card,
  UnstyledButton,
  Image,
  Popover,
  Flex,
  Anchor,
} from "@mantine/core";

import Pill from "./pills/Pill";

import IconPostOption from "../assets/icons/buttons/IconPostOption.svg";
import IconSave from "../assets/icons/buttons/IconSave.svg";
import IconReport from "../assets/icons/buttons/IconReport.svg";

import classes from "./PostSection.module.css";

const postOptionsAttributes = [
  {
    icon: IconSave,
    label: "Save",
    value: "save",
  },
  {
    icon: IconReport,
    label: "Report",
    value: "report",
  },
];

export default function PostSection({
  id,
  userProfileImage,
  userName,
  userRole,
  postTitle,
  postContent,
  tags,
  hashtags,
}) {
  const postOptions = postOptionsAttributes.map((item, index) => {
    const borderStyling = index === 1 ? null : classes.borderStyling;
    return (
      <Box
        key={item.value}
        style={{
          position: "relative",
        }}
      >
        <UnstyledButton w={125} my={13}>
          <Group gap={10}>
            <Image src={item.icon} w={15} h={15}></Image>
            <Text size="sm" c="var(--mantine-color-gray-7)" fw={500}>
              {item.label}
            </Text>
          </Group>
          <span className={borderStyling} />
        </UnstyledButton>
      </Box>
    );
  });

  return (
    <Popover position="bottom-end" width={150}>
      <Card key={id} withBorder radius={10} my={20} p={25}>
        <Flex justify="space-between">
          <Group>
            <Avatar src={userProfileImage} w={55} h={55} radius={10} />
            <Box>
              <Title order={4}>{userName}</Title>
              <Text size="sm" c="gray">
                {userRole}
              </Text>
            </Box>
          </Group>
          <Flex align="flex-start">
            <Popover.Target>
              <UnstyledButton>
                <Image src={IconPostOption} />
              </UnstyledButton>
            </Popover.Target>
          </Flex>
          <Popover.Dropdown py={0}>{postOptions}</Popover.Dropdown>
        </Flex>
        <Box my={5}>
          <Anchor
            underline="never"
            order={3}
            mt={5}
            c="var(--mantine-color-dark-10)"
            fw={700}
            style={{ fontSize: "25px" }}
            lineClamp={1}
          >
            {postTitle}
          </Anchor>
          <Text size="sm" my={5} lineClamp={3}>
            {postContent}
          </Text>
          <Title order={6} mb={5}>
            Topics Related
          </Title>
          <Group>
            {tags.map((tag) => (
              <Pill name={tag} key={tag} />
            ))}
          </Group>
          <Group mt={5}>
            {hashtags.map((item) => (
              <Anchor size="sm" fw={500}>#{item}</Anchor>
            ))}
          </Group>
        </Box>
      </Card>
    </Popover>
  );
}

import {
  Card,
  Group,
  Text,
  Box,
  Button,
  Stack,
  Title,
  Grid,
  Avatar,
  SimpleGrid,
} from "@mantine/core";

import Pill from "../../pills/Pill.jsx";
import GroupMemberCard from "./GroupMemberCard.jsx";
import ActionsBox from "../../ActionsBox.jsx";
import { useMemo } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import { EDIT_OPTION } from "../../../static/popover.js";

const MAX_PILLS = 3;

const MAX_WORDS = 25;

const truncateToWords = (text, MAX_WORDS = 25) => {
  const words = text.split(" ");
  return (
    words.slice(0, MAX_WORDS).join(" ") +
    (words.length > MAX_WORDS ? "..." : "")
  );
};

export default function DisplayCard({
  instance,
  variant = null,
  type,
  button: { buttonLabel, loading },
  onSelect,
  onModalSelect,
  onButtonClick,
  onLeaveBtnClick,
  ...props
}) {
  function handleClick(ref) {
    onSelect(ref);
  }

  const clickFn = (ref) => (variant === "view" ? undefined : handleClick(ref));

  const { header, title, description, order, pills, padding, card } =
    useMemo(() => {
      let values = {
        header: {
          image: {
            width: 44,
            height: 44,
          },
          text: {
            size: "xs",
          },
          button: {
            size: "sm",
            px: 20,
          },
        },
        title: {
          order: 5,
          fw: 500,
        },
        description: {
          size: "md",
        },
        order: {
          supportInterests: 3,
        },
        pills: {
          size: "md",
        },
        padding: 16,
        card: {
          style: {
            cursor: "pointer",
          },
        },
      };
      if (variant === "view") {
        values.header = {
          image: {
            width: 60,
            height: 60,
          },
          text: {
            size: "sm",
          },
          button: {
            size: "md",
            px: 24,
          },
        };
        values.title = {
          order: 3,
          fw: 600,
        };
        values.description = {
          size: "lg",
        };
        values.order = {
          supportInterests: 4,
        };
        values.pills = {
          size: "lg",
        };
        values.padding = 24;
        values.card.style = {
          cursor: "default",
        };
      }

      return values;
    }, [variant]);

  const pillInstances = useMemo(() => {
    const categories =
      variant === "view"
        ? instance.categories
        : instance.categories.slice(0, MAX_PILLS);
    return categories.length > 1 ? (
      categories.map((interest) => (
        <Pill size={pills.size} key={interest.key} name={interest.data.name} />
      ))
    ) : (
      <Text size="lg">The user has no input on Support Interests...</Text>
    );
  }, [instance.categories, pills.size, variant]);

  const memberListTypes = ["owned", "joined"];
  const memberListInstance =
    memberListTypes.includes(type) && variant === "view" ? (
      <Grid.Col order={4}>
        <Box>
          <Title order={title.order} fw={title.fw} mb={8}>
            Members
          </Title>

          {/* Data */}
          <Stack gap={8}>
            {instance.members.map((member) => (
              <GroupMemberCard
                image={member.profilePath}
                name={member.fullName}
                role={member.groupRole}
                bg="gray.0"
                key={member.key}
              >
                {type === "owned" && member.groupRole !== "Group Admin" && (
                  <Button
                    variant="subtle"
                    color="red.5"
                    onClick={() => onModalSelect(member)}
                  >
                    Remove
                  </Button>
                )}
              </GroupMemberCard>
            ))}
          </Stack>
        </Box>
      </Grid.Col>
    ) : undefined;

  const sharedTypesOfCompanions = ["companion", "posts", "overview"];

  const mappedAvailability = instance.availability
    ? Object.keys(instance.availability).map((day) => ({
        day,
        startTime: instance.availability[day].startTime,
        endTime: instance.availability[day].endTime,
      }))
    : [];

  const availabilityInstance =
    sharedTypesOfCompanions.includes(type) && variant === "view" ? (
      <Grid.Col order={4}>
        <Box>
          <Title order={title.order} fw={title.fw} mb={8}>
            Availability
          </Title>

          <Card bg="sky-blue.0">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 7 }}>
              {mappedAvailability.map(({ day, startTime, endTime }) => {
                const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
                const isAvailable =
                  startTime !== "" && endTime !== ""
                    ? `${startTime} - ${endTime}`
                    : "Not Available";
                return (
                  <Box ta="center">
                    <Title order={6} fw={500}>
                      {formattedDay}
                    </Title>
                    <Text size="xs">{isAvailable}</Text>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Card>
        </Box>
      </Grid.Col>
    ) : undefined;

  const joinedGroupsInstance =
    type === "companion" && variant === "view" ? (
      <Grid.Col order={5}>
        <Box>
          <Title order={title.order} fw={title.fw} mb={8}>
            Joined Groups
          </Title>

          {/* Data */}
          <SimpleGrid cols={2}>
            {instance.joinedGroups.map(
              ({ key, membersCount, groupImageUrl, name }) => {
                const memberCount = `${membersCount} members`;
                return (
                  <GroupMemberCard
                    key={key}
                    image={groupImageUrl}
                    name={name}
                    role={memberCount}
                    bg="sky-blue.0"
                    radius="md"
                  />
                );
              }
            )}
          </SimpleGrid>
        </Box>
      </Grid.Col>
    ) : undefined;

  const whichDescriptionTitle = sharedTypesOfCompanions.includes(type)
    ? instance.title
    : "Description";
  const isTruncated = (text) =>
    variant === "view" ? text : truncateToWords(text);
  const whichSubtitle = (instance) =>
    sharedTypesOfCompanions.includes(type)
      ? instance.role
      : `${instance.membersCount} members`;
  const withPronouns = (instance) =>
    sharedTypesOfCompanions.includes(type) && (
      <Text size="xs" c="dimmed">
        {instance.pronouns}
      </Text>
    );
  const includesLeaveButton =
    type === "joined" && variant === "view" ? (
      <Button
        variant="light"
        color="red"
        px={header.button.px}
        size={header.button.size}
        style={{ zIndex: 1 }}
        onClick={onLeaveBtnClick}
      >
        Leave Group
      </Button>
    ) : undefined;

  const isDisabled = useMemo(() => {
    return type === "community" ? instance.userJoinStatus : undefined;
  }, [instance.userJoinStatus, type]);

  const whichMainButton = useMemo(() => {
    const popoverOptions = EDIT_OPTION;
    return type === "posts" || type === "overview" ? (
      <ActionsBox
        onClick={(option) => onButtonClick(option, "1")}
        options={popoverOptions}
      >
        <IconDotsVertical size={30} stroke={1.5} />
      </ActionsBox>
    ) : (
      <Button
        px={header.button.px}
        size={header.button.size}
        color="sky-blue.5"
        onClick={() => onButtonClick(instance.key)}
        style={{ zIndex: 1 }}
        loading={loading}
        disabled={isDisabled}
      >
        {buttonLabel}
      </Button>
    );
  }, [type, instance.userJoinStatus, instance]);

  return (
    <Card
      p={padding}
      withBorder
      radius="lg"
      component="a"
      style={card.style}
      pos="relative"
      {...props}
    >
      {/* Overlay Button */}
      {variant !== "view" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            ...card.style,
          }}
          onClick={() => clickFn(instance.key)}
        />
      )}
      <Grid>
        <Grid.Col span={12}>
          <Group align="center">
            <Avatar
              src={instance.groupImageUrl}
              w={header.image.width}
              h={header.image.height}
              radius="sm"
            />
            <Stack flex={1} gap={0}>
              <Group gap={4}>
                <Title order={title.order} fw={title.fw}>
                  {instance.name}
                </Title>
                {withPronouns(instance)}
              </Group>

              <Text size={header.text.size} c="dimmed">
                {whichSubtitle(instance)}
              </Text>
            </Stack>

            <Group>
              {includesLeaveButton}

              {whichMainButton}
            </Group>
          </Group>
        </Grid.Col>

        <Grid.Col span={12}>
          <Box>
            <Title order={title.order} fw={title.fw} mb={8}>
              {whichDescriptionTitle}
            </Title>
            <Text size={description.size} lh={1.4}>
              {isTruncated(instance.description)}
            </Text>
          </Box>
        </Grid.Col>

        <Grid.Col order={order.supportInterests}>
          <Box>
            <Title order={title.order} fw={title.fw} mb={8}>
              Support Interests
            </Title>
            {/* Pills */}
            <Group gap={8} grow>
              {pillInstances}
            </Group>
          </Box>
        </Grid.Col>

        {/* {variant === "view" && (
          <Grid.Col>
            <Box>
              <Title order={title.order} fw={title.fw} mb={8}>
                Goal
              </Title>

              <Text size={description.size} lh={1.4}>
                My goal as an EaseMind Companion is to empower you to take
                control of your mental health journey. Through compassionate
                listening and personalized support, I aim to help you build
                resilience, foster self-awareness, and develop strategies for
                managing stress, anxiety, and emotional challenges.
              </Text>
            </Box>
          </Grid.Col>
        )} */}

        {memberListInstance}

        {availabilityInstance}

        {joinedGroupsInstance}
      </Grid>
    </Card>
  );
}

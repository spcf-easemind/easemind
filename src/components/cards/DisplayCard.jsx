import {
  Card,
  Group,
  Image,
  Text,
  Box,
  Button,
  Stack,
  Title,
  Grid,
} from "@mantine/core";

import Pill from "../pills/Pill.jsx";
import GroupMemberCard from "./GroupMemberCard.jsx";
import HappyImage from "../../assets/HappyImage.jpg";
import { useMemo } from "react";

// Max 3
const interests = ["Sadness", "Anxiety", "Depression"];

export default function DisplayCard({
  instance,
  variant = null,
  type,
  buttonLabel,
  onSelect,
  onModalSelect,
  onButtonClick,
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

  const pillInstances = instance.categories.map((interest) => (
    <Pill size={pills.size} key={interest.key} name={interest.data.name} />
  ));

  const memberListInstance =
    type === "owned" && variant === "view" ? (
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
              >
                <Button
                  variant="subtle"
                  color="red.5"
                  onClick={() => onModalSelect(member)}
                >
                  Remove
                </Button>
              </GroupMemberCard>
            ))}
          </Stack>
        </Box>
      </Grid.Col>
    ) : undefined;

  return (
    <Card
      p={padding}
      withBorder
      radius="lg"
      component="a"
      style={card.style}
      pos="relative"
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
            <Image
              src={HappyImage}
              w={header.image.width}
              h={header.image.height}
              radius="sm"
            />
            <Box flex={1}>
              <Title order={title.order} fw={title.fw}>
                {instance.name}
              </Title>
              <Text size={header.text.size} c="dimmed">
                {instance.membersCount} members
              </Text>
            </Box>
            <Button
              px={header.button.px}
              size={header.button.size}
              color="sky-blue.5"
              onClick={onButtonClick}
              style={{ zIndex: 1 }}
            >
              {buttonLabel}
            </Button>
          </Group>
        </Grid.Col>

        <Grid.Col span={12}>
          <Box>
            <Title order={title.order} fw={title.fw} mb={8}>
              Description
            </Title>
            <Text size={description.size} lh={1.4}>
              {instance.description}
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

        {variant === "view" && (
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
        )}

        {memberListInstance}
      </Grid>
    </Card>
  );
}

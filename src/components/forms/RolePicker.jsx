import { Stack, Title, Text, Group, Box, Card } from "@mantine/core";
import CardButton from "../buttons/CardButton.jsx";
import classes from "./RolePicker.module.css";

import IconManyPeople from "../../assets/icons/IconManyPeople.svg";
import IconVolunteer from "../../assets/icons/IconVolunteer.svg";

export default function RolePicker({ onClick }) {
  function handleOnClick(value) {
    const data = {
      role: value,
    };
    onClick(data);
  }
  return (
    <>
      <Group justify="center" className={classes.gap} flex={1}>
        <Box className={classes.flexItem}>
          <CardButton
            image={IconManyPeople}
            alt="Interface Icon of 3 People"
            value="EaseBuddy"
            onClick={handleOnClick}
          />
          <Box ta="center" c="white">
            <Title className={classes.header}>User</Title>
            <Text className={classes.subHeader} maw={150}>
              Share your feelings and connect with others.
            </Text>
          </Box>
        </Box>

        <Box className={classes.flexItem}>
          <CardButton
            image={IconVolunteer}
            alt="Interface Icon of Volunteer Jacket"
            value="EaseCompanion"
            onClick={handleOnClick}
          />
          <Box ta="center" c="white">
            <Title className={classes.header}>Volunteer</Title>
            <Text className={classes.subHeader} maw={150}>
              Support others in their mental health journey.
            </Text>
          </Box>
        </Box>
      </Group>

      <Card.Section bg="white" p={16} mih={100}>
        <Text size="sm" ta="center">
          You are valuable, no matter the challenges you face. Your feelings,
          struggles, and experiences matter. You deserve to be seen, heard, and
          loved unconditionally. Your mental health is important, and you are
          worthy of support at every step of the way.
        </Text>
      </Card.Section>
    </>
  );
}

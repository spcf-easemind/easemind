import { Group, Title, Card } from "@mantine/core";

import classes from "./LoginPage.module.css";

import AuthCard from "../components/cards/AuthCard.jsx";

const title =
  "In a world filled with hardships, why don't we prioritize our happiness and mental well-being instead?";

export default function LoginPage() {
  return (
    <Group
      w="100%"
      wrap="no-wrap"
      gap={48}
      justify="center"
      h="inherit"
    >
      <Title className={classes.heading}>{title}</Title>
      <AuthCard formType="login"></AuthCard>
    </Group>
  );
}

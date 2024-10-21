import {
  Card,
  Title,
  Text,
  Group,
  Switch,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { notificationsFn } from "../../utils/notifications";
import classes from "./AnonymousNotifications.module.css";

export default function AnonymousNotifications() {
  const { setAnonymousUserFn, loggedInUser, message, loading } =
    useAuthenticationStore(
      useShallow((state) => ({
        message: state.message,
        loading: state.loading,
        loggedInUser: state.user.data,
        setAnonymousUserFn: state.setAnonymousUser,
      }))
    );

  console.log("Loading", loading);

  const [anonymousMode, setAnonymousMode] = useState(false);

  useEffect(() => {
    setAnonymousMode(loggedInUser.anonymousStatus);
  }, []);

  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const computedColorScheme = useComputedColorScheme(colorScheme);

  async function toggleAnonymousMode() {
    const id = notificationsFn.load();
    const response = await setAnonymousUserFn(loggedInUser.key, !anonymousMode);

    if (response) {
      notificationsFn.success(id, message);
      setAnonymousMode((prev) => !prev);
      setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
    } else {
      notificationsFn.error(id, message);
    }
  }

  return (
    <>
      <Card
        px={20}
        py={28}
        mx="auto"
        className={classes.cardBg}
        withBorder
        radius="md"
        maw={800}
      >
        <Title order={3}>Go Anonymous</Title>
        <Text mt={8} lh={1.2}>
          Want complete anonymity? Enable Anonymous Mode to hide your personal
          information, ensuring your identity stays confidential while
          connecting with others or accessing mental health support resources.
        </Text>
        <Group mt={18} py={18} justify="space-between" align="center">
          <Title order={4}>Anonymous Mode</Title>
          <Switch
            disabled={loading}
            checked={anonymousMode}
            onChange={toggleAnonymousMode}
            size="lg"
          />
        </Group>
      </Card>

      <Card
        mt={18}
        px={20}
        py={28}
        mx="auto"
        className={classes.cardBg}
        withBorder
        radius="md"
        maw={800}
      >
        <Title order={3}>Notifications</Title>
        <Text mt={8} lh={1.2}>
          Turn on notifications to stay updated, or turn them off if you prefer
          not to receive any notifications.
        </Text>
        <Group mt={18} py={18} justify="space-between" align="center">
          <Title order={4}>Notifications</Title>
          <Switch size="lg" />
        </Group>
      </Card>
    </>
  );
}

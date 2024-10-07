import { Stack, Title, Text, Group } from "@mantine/core";
import classes from "./RolePicker.module.css";

import UserButton from "../buttons/UserButton.jsx";

export default function RolePicker() {
  return (
    <>
      <Stack align="center" mb={32}>
        <Title className={classes.title}>Choose your Role</Title>
        <Text className={classes.subTitle}>
          How would you like to be a part of Easemind?
        </Text>
      </Stack>

      <Group>
        <UserButton />
      </Group>
    </>
  );
}

import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";
import { rem } from "@mantine/core";
const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

export const notificationsFn = {
  load: () => {
    const id = notifications.show({
      loading: true,
      title: "Hold a second...",
      message: "Data will be loaded in a while, you cannot close this yet",
      autoClose: false,
      withCloseButton: false,
    });
    return id;
  },
  success: (id, message) =>
    notifications.update({
      id,
      title: "All Good!",
      color: "teal",
      message: message,
      icon: checkIcon,
      loading: false,
      autoClose: 2000,
    }),
  error: (id, message) =>
    notifications.update({
      id,
      title: "Bummer!",
      color: "red",
      message: message,
      icon: xIcon,
      loading: false,
      autoClose: 2000,
    }),
};

import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification as MantineNotification, rem } from "@mantine/core";

export default function Notification({ variant, children }) {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const typeOfNotifIcon = variant === "error" ? xIcon : checkIcon;
  const typeOfTitle = variant === "error" ? "Bummer!" : "All Good!";

  return (
    <MantineNotification icon={typeOfNotifIcon} title={typeOfTitle}>
      {children}
    </MantineNotification>
  );
}

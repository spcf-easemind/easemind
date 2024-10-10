import {
  ActionIcon,
  Box,
  Button,
  Card,
  Modal,
  Stack,
  Title,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import classes from "./ChatModal.module.css";
export default function ChatModal({
  modal: { opened, onClose },
  title,
  children,
  buttonLabel,
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      withCloseButton={false}
      radius="lg"
      style={{
        position: "relative",
        overflow: "visible",
      }}
    >
      <ActionIcon className={classes.closeIcon} onClick={onClose}>
        <IconX />
      </ActionIcon>
      <form>
        <Card px={16} py={24} mih={600}>
          <Stack gap={24} mih="inherit">
            <Title order={3} ta="center">
              {title}
            </Title>
            <Box flex={1}>{children}</Box>
            <Button fullWidth type="submit" size="lg" radius="sm">
              {buttonLabel}
            </Button>
          </Stack>
        </Card>
      </form>
    </Modal>
  );
}

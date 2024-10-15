import { ActionIcon, Box, Button, Card, Modal, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function FindChatModal({
  form: { form, onSubmit, loading },
  model: { opened, onClose },
  titleSection,
  buttonLabel,
  children,
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={500}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      withCloseButton={false}
      radius="lg"
      style={{
        position: "relative",
        overflowY: "auto",
      }}
    >
      <ActionIcon
        style={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}
        radius="xl"
        bg="white"
        c="black"
        onClick={onClose}
      >
        <IconX />
      </ActionIcon>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Card px={16} py={24} bg="transparent">
          <Stack>
            <Box ta="center">{titleSection}</Box>
            <Box flex={1}>{children}</Box>
            <Button
              loading={loading}
              fullWidth
              type="submit"
              size="md"
              radius="sm"
            >
              {buttonLabel}
            </Button>
          </Stack>
        </Card>
      </form>
    </Modal>
  );
}

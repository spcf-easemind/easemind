import { Button, Card, Modal, TextInput, Title } from "@mantine/core";

export default function TaskModal({ modal: { opened, onClose, title } }) {
  const computedTitle = title
    ? title.charAt(0).toUpperCase() + title.slice(1)
    : "";
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="sm"
      radius="lg"
      padding={0}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Card ta="center" padding={24}>
        <Title order={3} mb={24}>
          {computedTitle} Task
        </Title>
        <form>
          <TextInput size="lg" />

          <Button mt={24} fullWidth size="md" radius="md" color="sky-blue.5">
            Save Changes
          </Button>
        </form>
      </Card>
    </Modal>
  );
}

import { Button, Card, Modal, Textarea, TextInput } from "@mantine/core";

export default function DiaryLogModal({
  modal: { opened, onClose },
  button: { btnLabel },
}) {
  const whichLabel = btnLabel === "create" ? "Save Diary" : "Save Changes";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="80%"
      radius="lg"
      padding={0}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Card padding={24}>
        <form>
          <TextInput
            color="gray"
            size="lg"
            placeholder="Title of your daily diary..."
          />

          <Textarea
            mt={18}
            placeholder="Description daily diary..."
            size="lg"
            rows={6}
          />

          <Button mt={18} fullWidth size="md" radius="md" color="sky-blue.5">
            {whichLabel}
          </Button>
        </form>
      </Card>
    </Modal>
  );
}

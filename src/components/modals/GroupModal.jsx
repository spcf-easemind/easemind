import {
  ActionIcon,
  Card,
  Group,
  Modal,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function GroupModal({
  modal: { opened, onClose },
  form: { onClick, loading },
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size={500}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      padding={0}
    >
      <Card padding={0}>
        <Card.Section p={20} withBorder>
          <Group justify="space-between">
            <Title order={3}>Remove from group?</Title>
            <ActionIcon
              onClick={onClose}
              radius="lg"
              variant="subtle"
              color="black"
            >
              <IconX stroke={1.5} />
            </ActionIcon>
          </Group>
        </Card.Section>

        <Card.Section p={20}>
          <Text mb={16}>
            Are you sure you want to remove <strong>“James”</strong> from the
            group? Once removed, all associated data will no longer be
            accessible unless they rejoin.
          </Text>

          <Group justify="end">
            <Button onClick={onClose} variant="light">
              Cancel
            </Button>
            <Button onClick={onClick} loading={loading}>
              Leave
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </Modal>
  );
}

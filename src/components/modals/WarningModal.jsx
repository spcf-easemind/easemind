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

export default function WarningModal({
  modal: { opened, onClose },
  form: { message, title },
  children,
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
            <Title order={3}>{title}</Title>
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
          <Text mb={16}>{message}</Text>

          <Group justify="end">{children}</Group>
        </Card.Section>
      </Card>
    </Modal>
  );
}

import { Modal } from "@mantine/core";

import RolePicker from "../forms/RolePicker.jsx";

export default function SignUpModal({ opened, onClose }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      padding="xl"
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      radius="lg"
      styles={{
        header: {
          paddingBottom: 16,
          backgroundColor: "var(--mantine-primary-color-6)",
        },
        content: {
          backgroundColor: "var(--mantine-primary-color-6)",
        },
      }}
    >
      <RolePicker />
    </Modal>
  );
}

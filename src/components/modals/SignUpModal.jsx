import { Modal } from "@mantine/core";
import classes from "./SignUpModal.module.css";
import { useMatches } from "@mantine/core";

import RolePicker from "../forms/RolePicker.jsx";

export default function SignUpModal({ opened, onClose }) {

  const size = useMatches({
    base: "md",
    md: "lg"
  })

  const padding = useMatches({
    base: 24,
    md: 36
  })

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      radius="lg"
      size={size}
      padding={padding}
      classNames={{
        header: classes.modal,
        content: classes.modal,
      }}
    >
      <RolePicker />
    </Modal>
  );
}

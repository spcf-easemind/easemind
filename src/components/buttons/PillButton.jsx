import { UnstyledButton } from "@mantine/core";
import Pill from "../pills/Pill.jsx";

export default function PillButton({ name, onSelect, ...props }) {
  return (
    <UnstyledButton onClick={() => onSelect(name)}>
      <Pill name={name} {...props} />
    </UnstyledButton>
  );
}

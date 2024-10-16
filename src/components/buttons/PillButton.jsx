import { UnstyledButton } from "@mantine/core";
import Pill from "../pills/Pill.jsx";

export default function PillButton({ active, name, onSelect }) {
  return (
    <UnstyledButton onClick={() => onSelect(name)}>
      <Pill name={name} data-active={name === active || undefined} />
    </UnstyledButton>
  );
}

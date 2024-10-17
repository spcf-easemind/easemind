import { UnstyledButton } from "@mantine/core";
import Pill from "../pills/Pill.jsx";

export default function PillButton({ active, name, onSelect }) {
  return (
    <UnstyledButton onClick={() => onSelect(name)}>
      <Pill name={name} data-active={active || undefined} />
    </UnstyledButton>
  );
}

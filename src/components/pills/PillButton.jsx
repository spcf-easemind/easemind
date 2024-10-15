import { Pill, UnstyledButton } from "@mantine/core";
import classes from "./PillButton.module.css";

export default function PillButton({ active, name, onSelect }) {
  return (
    <UnstyledButton onClick={() => onSelect(name)}>
      <Pill
        size="md"
        data-active={name === active || undefined}
        className={classes.root}
      >
        {name}
      </Pill>
    </UnstyledButton>
  );
}

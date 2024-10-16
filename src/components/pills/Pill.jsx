import { Pill as PillMantine } from "@mantine/core";
import classes from "./Pill.module.css";

export default function Pill({ active, name, ...props }) {
  return (
    <PillMantine size="md" className={classes.root} {...props}>
      {name}
    </PillMantine>
  );
}

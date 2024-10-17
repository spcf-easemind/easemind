import { Pill as PillMantine } from "@mantine/core";
import classes from "./Pill.module.css";

export default function Pill({ name, ...props }) {
  console.log(name);
  return (
    <PillMantine size="md" className={classes.root} {...props}>
      {name}
    </PillMantine>
  );
}

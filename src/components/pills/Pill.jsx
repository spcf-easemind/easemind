import { Pill as PillMantine } from "@mantine/core";
import classes from "./Pill.module.css";

export default function Pill({ name, pillWidth, ...props }) {
  return (
    <PillMantine
      w={pillWidth ? pillWidth : undefined}
      size="md"
      className={classes.root}
      styles={{
        label: {
          textAlign: "center"
        }
      }}
      {...props}
    >
      {name}
    </PillMantine>
  );
}

import { Stepper as MantineStepper } from "@mantine/core";
import { rem } from "@mantine/core";

export default function Stepper({ active, steppers }) {
  return (
    <MantineStepper
      px="xl"
      iconSize={28}
      color="green"
      active={active}
      styles={{
        step: {
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          color: "white",
        },
        stepLabel: {
          fontSize: 12,
          fontWeight: 400,
        },
        stepBody: {
          margin: 0,
        },
        separator: {
          marginTop: rem(-24),
          marginLeft: rem(-16),
          marginRight: rem(-16),
          height: rem(2),
        },
      }}
    >
      {steppers.map((stepper) => (
        <MantineStepper.Step
          icon=" "
          key={stepper}
          label={stepper}
        ></MantineStepper.Step>
      ))}
    </MantineStepper>
  );
}

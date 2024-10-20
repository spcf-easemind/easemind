import { Box, Checkbox, Group, Text, Image, Stack } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import IconClock from "../../assets/icons/input/IconClock.svg";

export default function AvailabilityCheckboxes({ form: { form } }) {
  const iconImage = <Image w={24} h={24} src={IconClock} alt="Clock icon" />;
  const formAttributes = form.getValues().availability;


  const checkboxInstances = formAttributes.map((attrib, index) => (
    <Group key={attrib.day} justify="center" align="center">
      <Box w={80}>
        <Checkbox
          size="md"
          label={attrib.day}
          {...form.getInputProps(`availability.${index}.enabled`, {
            type: "checkbox",
          })}
        />
      </Box>

      <Group flex={1} wrap="no-wrap">
        <TimeInput
          size="lg"
          w="100%"
          rightSection={iconImage}
          {...form.getInputProps(`availability.${index}.start`)}
        />
        {"-"}
        <TimeInput
          size="lg"
          w="100%"
          rightSection={iconImage}
          {...form.getInputProps(`availability.${index}.end`)}
        />
      </Group>
    </Group>
  ));

  return <Stack>{checkboxInstances}</Stack>;
}

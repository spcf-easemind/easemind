import { Box, Checkbox, Group, Text, Image, Stack } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import IconClock from "../../assets/icons/input/IconClock.svg";

export default function AvailabilityCheckboxes({ form: { form } }) {
  const iconImage = <Image w={24} h={24} src={IconClock} alt="Clock icon" />;
  const formAttributes = form.getValues().availability;
  const mappedCheckboxData = Object.keys(formAttributes).map((day) => ({
    day,
    startTime: formAttributes[day].startTime,
    endTime: formAttributes[day].endTime,
  }));

  const checkboxInstances = mappedCheckboxData.map((attrib) => {
    const formattedDay =
      attrib.day.charAt(0).toUpperCase() + attrib.day.slice(1, 3);
    return (
      <Group key={attrib.day} justify="center" align="center">
        <Box w={80}>
          <Checkbox
            size="md"
            label={formattedDay}
            // {...form.getInputProps(`availability.${index}.enabled`, {
            //   type: "checkbox",
            // })}
          />
        </Box>

        <Group flex={1} wrap="no-wrap">
          <TimeInput
            size="lg"
            w="100%"
            rightSection={iconImage}
            value={attrib.startTime}
            {...form.getInputProps(`availability.${attrib.day}.startTime`)}
          />
          {"-"}
          <TimeInput
            size="lg"
            w="100%"
            rightSection={iconImage}
            value={attrib.endTime}
            {...form.getInputProps(`availability.${attrib.day}.endTime`)}
          />
        </Group>
      </Group>
    );
  });

  return <Stack>{checkboxInstances}</Stack>;
}

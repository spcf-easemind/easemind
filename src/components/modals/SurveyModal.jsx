import { Modal, Group, Stack, Text, Box, Card } from "@mantine/core";
import { useMatches } from "@mantine/core";
import { useCounter } from "@mantine/hooks";

import Heading from "../headings/Heading.jsx";
import RolePicker from "../forms/RolePicker.jsx";
import Questions from "../forms/Questions.jsx";
import Stepper from "../Stepper.jsx";

import {
  STEPPER_DATA,
  QUESTION_DATA,
  STEPPER_LABELS,
} from "../../static/register.js";

export default function SurveyModal({ form, opened, onClose, onSubmit }) {
  const [stepper, { increment, decrement, set }] = useCounter(1, {
    min: 1,
    max: 7,
  });

  function handleFormData(data) {
    form.setValues({ ...data });
    increment();

    if (stepper + 1 === 7) {
      onSubmit();
      set(1);
    }
  }

  function handleCheckBoxData(data) {
    const currentSurvey = form.getValues().survey;
    const updatedSurvey = {
      survey: {
        ...currentSurvey,
        [stepper - 1]: data,
      },
    };
    handleFormData(updatedSurvey);
  }

  const size = useMatches({
    base: "md",
    md: "lg",
  });

  const padding = useMatches({
    base: 24,
    md: 36,
  });

  const headerProps =
    form.getValues().role === "EaseBuddy"
      ? STEPPER_DATA.EaseBuddy[stepper]
      : form.getValues().role === "EaseCompanion"
      ? STEPPER_DATA.EaseCompanion[stepper]
      : STEPPER_DATA[stepper];

  const stepperKeys = form.getValues().role
    ? STEPPER_LABELS[form.getValues().role]
    : [];

  const activeStepper = stepper - 2;

  const headingInstance = <Heading {...headerProps} />;

  const formInstance =
    stepper > 1 ? (
      <Box>
        <Group justify="center" mb={32}>
          <Stack gap={24}>
            {QUESTION_DATA[form.getValues().role][stepper].map((question) => (
              <Questions
                key={question.label}
                {...question}
                onClick={handleCheckBoxData}
              />
            ))}
          </Stack>
        </Group>

        <Box mb={32}>
          <Stepper active={activeStepper} steppers={stepperKeys} />
        </Box>

        <Text size="xs" ta="center" c="white" mb={16}>
          Rest assured, your responses will be kept completely confidential
        </Text>
      </Box>
    ) : (
      <RolePicker onClick={handleFormData} />
    );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      radius="lg"
      size={size}
      padding={0}
      withCloseButton={false}
    >
      <Card padding={0} bg="sky-blue.5" h={500} mih={600}>
        <Stack ta="center" justify="center" h="35%">
          {headingInstance}
        </Stack>
        <form style={{ height: "65%", position: "relative" }}>
          {formInstance}
        </form>
      </Card>
    </Modal>
  );
}

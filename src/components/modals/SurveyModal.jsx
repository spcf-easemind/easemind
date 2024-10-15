import { Modal, Group, Stack, Text, Box } from "@mantine/core";
import { useMatches } from "@mantine/core";
import classes from "./SurveyModal.module.css";
import { useForm } from "@mantine/form";

import { useState } from "react";

import Heading from "../headings/Heading.jsx";
import RolePicker from "../forms/RolePicker.jsx";
import Questions from "../forms/Questions.jsx";
import Stepper from "../Stepper.jsx";

import {
  STEPPER_DATA,
  QUESTION_DATA,
  STEPPER_LABELS,
} from "../../static/register.js";

export default function SurveyModal({ opened, onClose, onSubmit }) {
  const [stepper, setStepper] = useState(1);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      role: undefined,
      survey: {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
      },
    },
  });

  function handleFormData(data) {
    form.setValues({ ...data });
    setStepper((oldVal) => oldVal + 1);

    if (stepper + 1 === 7) {
      const formValues = form.getValues();

      // Functions
      onSubmit(formValues);
      onClose();
      setStepper(1);
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
    form.getValues().role === "user"
      ? STEPPER_DATA.user[stepper]
      : form.getValues().role === "volunteer"
      ? STEPPER_DATA.volunteer[stepper]
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
      padding={padding}
      classNames={{
        header: classes.modal,
        content: classes.modal,
      }}
      withCloseButton={false}
    >
      <Stack justify="center" h={550}>
        <Box>
          {headingInstance}

          <form>{formInstance}</form>
        </Box>
      </Stack>
    </Modal>
  );
}

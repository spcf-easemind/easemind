import { Modal, Group, Stack, Text, Box, Card } from "@mantine/core";
import { useMatches } from "@mantine/core";
import { useCounter } from "@mantine/hooks";

import Heading from "../../headings/Heading.jsx";
import RolePicker from "../../forms/RolePicker.jsx";
import Questions from "../../forms/Questions.jsx";
import Stepper from "../../Stepper.jsx";
import classes from "./SurveyModal.module.css";

import {
  STEPPER_DATA,
  QUESTION_DATA,
  STEPPER_LABELS,
} from "../../../static/register.js";

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
      <>
        <Group flex={1} mt={32} justify="center">
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

        <Box mt={16}>
          <Stepper active={activeStepper} steppers={stepperKeys} />
        </Box>

        <Text mt={16} size="xs" c="white">
          Rest assured, your responses will be kept completely confidential
        </Text>
      </>
    ) : (
      <RolePicker onClick={handleFormData} />
    );

    const minHeight = useMatches({
      base: 500,
      sm: 550,
    })

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
    size={600}
      padding={0}
      withCloseButton={false}
    >
      <Card
        className={classes.card}
        padding={36}
        h={500}
        mih={minHeight}
        ta="center"
        component="form"
        style={{
          overflowY: "auto",
        }}
      >
        {headingInstance}
        <Stack h="inherit">{formInstance}</Stack>
      </Card>
    </Modal>
  );
}

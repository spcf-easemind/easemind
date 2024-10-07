import { Group, Title } from "@mantine/core";

import classes from "./LoginPage.module.css";

import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";

import SignUpModal from "../components/modals/SignUpModal.jsx";
import AuthCard from "../components/cards/AuthCard.jsx";

const title =
  "In a world filled with hardships, why don't we prioritize our happiness and mental well-being instead?";

export default function LoginPage() {
  const [opened, { open: handleOpen, close: handleClose }] =
    useDisclosure(false);

  const handleSubmit = useCallback(() => {
    console.log("Form submitted");
  }, []);

  return (
    <>
      <Group w="100%" wrap="no-wrap" gap={48} justify="center" h="inherit">
        <Title className={classes.heading}>{title}</Title>
        <AuthCard
          formType="login"
          onSubmit={(formData) => handleSubmit(formData)}
          onDialogOpen={handleOpen}
        ></AuthCard>
      </Group>

      <SignUpModal opened={opened} onClose={handleClose}></SignUpModal>
    </>
  );
}

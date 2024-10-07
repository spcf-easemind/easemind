import { Flex, Title } from "@mantine/core";

import classes from "./LoginPage.module.css";

import { useDisclosure } from "@mantine/hooks";
import { useMatches } from "@mantine/core";
import { useCallback } from "react";

import SignUpModal from "../components/modals/SignUpModal.jsx";
import AuthCard from "../components/cards/AuthCard.jsx";

const title =
  "In a world filled with hardships, why don't we prioritize our happiness and mental well-being instead?";

export default function LoginPage() {
  const [opened, { open: handleOpen, close: handleClose }] =
    useDisclosure(false);

  function handleSubmit() {
    console.log("Form submitted");
  }

  const titleFontSize = useMatches({
    base: 40,
    sm: 55,
    lg: 65,
  });

  const titleMarginTop = useMatches({
    base: 32,
    md: 0,
  });

  console.log(titleFontSize);

  return (
    <>
      <Flex
        w="100%"
        wrap="no-wrap"
        gap={48}
        justify="center"
        align="center"
        h="inherit"
        direction={{ base: "column", sm: "row" }}
      >
        <Title
          size={titleFontSize}
          className={classes.heading}
          ta={{ base: "center", sm: "start" }}
          maw={{ base: "100%", sm: "60%" }}
          mt={titleMarginTop}
        >
          {title}
        </Title>
        <AuthCard
          formType="login"
          onSubmit={(formData) => handleSubmit(formData)}
          onDialogOpen={handleOpen}
        ></AuthCard>
      </Flex>

      <SignUpModal opened={opened} onClose={handleClose}></SignUpModal>
    </>
  );
}

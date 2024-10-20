import { Stack, Title, Text } from "@mantine/core";
import classes from "./Heading.module.css";

export default function Heading({ title, text }) {
  return (
    <>
      <Title className={classes.title} mb={16}>{title}</Title>
      <Text className={classes.subTitle}>{text}</Text>
    </>
  );
}

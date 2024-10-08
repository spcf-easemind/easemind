import { Stack, Title, Text } from "@mantine/core";
import classes from "./Heading.module.css";
import { useMatches } from "@mantine/core";

export default function Heading({ title, text }) {
  const marginBottom = useMatches({
    base: 16,
    md: 32,
  });
  return (
    <Stack align="center" mb={marginBottom}>
      <Title className={classes.title}>{title}</Title>
      <Text className={classes.subTitle}>{text}</Text>
    </Stack>
  );
}

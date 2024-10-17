import {
  Title,
  Container,
  Center,
  Text,
  Card,
} from "@mantine/core";

import classes from "./QuoteBox.module.css";

export default function QuoteBox({ quote, source }) {
  return (
    <Card p={0} className={classes.bgImage}>
      <Center p="lg">
        <Container>
          <Title order={3} className={classes.textStyling} pb={10}>
            Quote of the Day
          </Title>
          <Text className={classes.textStyling} pb={10} size="lg" fw={500}>
            "{quote}"
          </Text>
          <Text className={classes.textStyling} fw={500}>-{source}</Text>
        </Container>
      </Center>
    </Card>
  );
}

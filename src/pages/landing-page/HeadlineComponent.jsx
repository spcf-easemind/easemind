import { Button, Container, Title, Text, Flex } from "@mantine/core";
import classes from "./HeadlineComponent.module.css";

export default function Headline() {
  return (
    <div className={classes.backgroundImage}>
      <Container className={classes.headlineContent}>
        <Flex direction="column" align="center" justify="center">
          <Title order={1} style={{ marginBottom: "20px" }}>
            EASEMIND
          </Title>
          <Text size="lg" style={{ marginBottom: "30px" }}>
            Vent Out. Ease In.
          </Text>
          <Button radius="xl" size="md">
            Get Started
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
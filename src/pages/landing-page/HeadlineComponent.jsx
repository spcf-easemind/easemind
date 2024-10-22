import { Button, Container, Title, Text, Flex } from "@mantine/core";
import classes from "./HeadlineComponent.module.css";
import { useNavigate } from "react-router-dom";

export default function Headline() {
  const navigate = useNavigate();
  return (
    <div id="home" className={classes.backgroundImage}>
      <Container className={classes.headlineContent}>
        <Flex direction="column" align="center" justify="center">
          <Title order={1} style={{ marginBottom: "20px" }}>
            EASEMIND
          </Title>
          <Text size="lg" style={{ marginBottom: "30px" }}>
            Vent Out. Ease In.
          </Text>
          <Button radius="xl" size="md" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </Flex>
      </Container>
    </div>
  );
}

import { Card } from "@mantine/core";
import AboutUs from "../../components/terms/AboutUs";
import classes from "./AboutUsPage.module.css";

export default function AboutUsPage() {
  return (
    <Card
      px={20}
      py={28}
      mx="auto"
      className={classes.cardBg}
      withBorder
      radius="md"
      maw={800}
    >
      <AboutUs />
    </Card>
  );
}

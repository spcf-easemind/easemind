import { Card } from "@mantine/core";
import AboutUs from "../../components/terms/AboutUs";

export default function AboutUsPage() {
  return (
    <Card
      px={20}
      py={28}
      mx="auto"
      bg="gray.0"
      withBorder
      radius="md"
      maw={800}
    >
      <AboutUs />
    </Card>
  );
}

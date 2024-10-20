import { Card } from "@mantine/core";
import PrivacyPolicy from "../../components/terms/PrivacyPolicy";

export default function PrivacyPolicyPage() {
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
      <PrivacyPolicy />
    </Card>
  );
}

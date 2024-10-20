import { Card } from "@mantine/core";
import TermsAndConditions from "../../components/terms/TermsAndConditions";

export default function TermsConditionsPage() {
  return (
    <>
      <Card
        px={20}
        py={28}
        mx="auto"
        bg="gray.0"
        withBorder
        radius="md"
        maw={800}
      >
        <TermsAndConditions />
      </Card>
    </>
  );
}

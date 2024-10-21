import { Card } from "@mantine/core";
import PrivacyPolicy from "../../components/terms/PrivacyPolicy";
import classes from "./PrivacyPolicyPage.module.css";

export default function PrivacyPolicyPage() {
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
      <PrivacyPolicy />
    </Card>
  );
}

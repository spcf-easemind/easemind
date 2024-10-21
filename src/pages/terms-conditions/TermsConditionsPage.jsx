import { Card } from "@mantine/core";
import TermsAndConditions from "../../components/terms/TermsAndConditions";
import classes from "./TermsConditionsPage.module.css";

export default function TermsConditionsPage() {
  return (
    <>
      <Card
        px={20}
        py={28}
        mx="auto"
        className={classes.cardBg}
        withBorder
        radius="md"
        maw={800}
      >
        <TermsAndConditions />
      </Card>
    </>
  );
}

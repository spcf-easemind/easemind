import { Modal, Card, ScrollArea } from "@mantine/core";
import TermsAndConditions from "../terms/TermsAndConditions";

export default function TermsAndConditionsModal() {
  return (
    <Modal
      opened={false}
      withCloseButton={false}
      size="lg"
      padding={0}
      radius="lg"
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Card h="90vh">
        <ScrollArea h="100%">
          <TermsAndConditions />
        </ScrollArea>
      </Card>
    </Modal>
  );
}

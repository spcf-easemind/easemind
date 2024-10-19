import {
  Card,
  Modal,
  SimpleGrid,
  Title,
  UnstyledButton,
  Image,
} from "@mantine/core";
import { EMOTION_ATTRIBUTES } from "../../../static/diary";

export default function EmotionModal({ modal: { opened, onClose }, onClick }) {
  const buttonInstances = EMOTION_ATTRIBUTES.map((button) => (
    <UnstyledButton onClick={() => onClick(button.value)}>
      <Image src={button.icon} alt={button.label} />
    </UnstyledButton>
  ));

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="lg"
      radius="lg"
      padding={0}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Card px={64} py={32} ta="center">
        <Title order={2} ff="var(--mantine-baloo-bhai-2)">
          Hi there! How has your day been?
        </Title>

        <SimpleGrid cols={5} mt={24} spacing="xl">
          {buttonInstances}
        </SimpleGrid>
      </Card>
    </Modal>
  );
}

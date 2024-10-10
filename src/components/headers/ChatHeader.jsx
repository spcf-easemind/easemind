import { Group, Image, Text, UnstyledButton } from "@mantine/core";
import HappyImage from "../../assets/HappyImage.jpg";
import IconInfo from "../../assets/icons/header/IconInfo.svg";

export default function ChatHeader({
  onClick: { toggleDesktop, toggleMobile },
  ...props
}) {
  return (
    <Group
      {...props}
      justify="space-between"
      style={{
        borderBottom: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      <Group>
        <Image w={50} h={50} radius="md" src={HappyImage} />
        <div>
          <Text size="md" fw={500}>
            Malakas Group
          </Text>
          <Text size="xs" c="dimmed">
            Last seen now
          </Text>
        </div>
      </Group>

      <UnstyledButton
        py={7}
        px="sm"
        hiddenFrom="md"
        onClick={toggleMobile}
      >
        <Image src={IconInfo} w={24} />
      </UnstyledButton>
      <UnstyledButton
        py={7}
        px="sm"
        visibleFrom="md"
        onClick={toggleDesktop}
      >
        <Image src={IconInfo} w={24} />
      </UnstyledButton>
    </Group>
  );
}

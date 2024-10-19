import { Card, Group, Image, Text } from "@mantine/core";
import IconPlusBox from "../../assets/icons/buttons/IconPlusBox.svg";
export default function CreateButtonCard({
  onClick,
  children,
  px = 16,
  py = 16,
  size = "md",
  imageSize = 25,
}) {
  return (
    <Card
      px={px}
      py={py}
      withBorder
      c="dark.5"
      bg="gray.0"
      radius="lg"
      component="button"
      w="100%"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Group>
        <Image src={IconPlusBox} alt="Create a group" w={imageSize} h={imageSize} />
        <Text size={size}>{children}</Text>
      </Group>
    </Card>
  );
}

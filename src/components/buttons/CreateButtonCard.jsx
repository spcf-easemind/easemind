import { Card, Group, Image, Text } from "@mantine/core";
import IconPlusBox from "../../assets/icons/buttons/IconPlusBox.svg";
export default function CreateButtonCard({ onClick, children }) {
  return (
    <Card
      padding={16}
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
        <Image src={IconPlusBox} alt="Create a group" w={25} h={25} />
        <Text>{children}</Text>
      </Group>
    </Card>
  );
}

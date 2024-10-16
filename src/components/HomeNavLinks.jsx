import { Image, UnstyledButton, Text, Group, Box } from "@mantine/core";

export default function HomeNavLinks({ icon, label }) {
  console.log(icon);
  return (
    <UnstyledButton>
      <Group gap={20}>
        <Image src={icon} w={35} h={30} />
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

import { Image, UnstyledButton, Text, Group, Box } from "@mantine/core";
import classes from "./HomeNavLinks.module.css";
export default function HomeNavLinks({ active, icon, label, onSelect }) {
  return (
    <UnstyledButton
      className={classes.linkStyling}
      data-active={active === label || undefined}
      p={16}
      onClick={() => onSelect()}
    >
      <Group gap={20}>
        <Image src={icon} w={35} h={30} />
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

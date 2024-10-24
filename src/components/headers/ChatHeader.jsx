import { Avatar, Group, Image, Text, UnstyledButton } from "@mantine/core";
import IconInfo from "../../assets/icons/header/IconInfo.svg";
import classes from "./ChatHeader.module.css";

export default function ChatHeader({
  onClick: { toggleDesktop, toggleMobile },
  header: { name, image, lastSeen },
  ...props
}) {
  return (
    <Group
      {...props}
      justify="space-between"
      className={classes.cardBorder}
    >
      <Group>
        <Avatar
          radius="md"
          w={50}
          h={50}
          src={image}
          variant={name !== "" ? undefined : "transparent"}
        >
          {name !== "" ? undefined : " "}
        </Avatar>
        <div>
          <Text size="md" fw={500}>
            {name}
          </Text>
          <Text size="xs" c="dimmed">
            {lastSeen}
          </Text>
        </div>
      </Group>

      <UnstyledButton py={7} px="sm" hiddenFrom="md" onClick={toggleMobile}>
        <Image src={IconInfo} w={24} />
      </UnstyledButton>
      <UnstyledButton py={7} px="sm" visibleFrom="md" onClick={toggleDesktop}>
        <Image src={IconInfo} w={24} />
      </UnstyledButton>
    </Group>
  );
}

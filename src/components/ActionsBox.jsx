import {
  Image,
  UnstyledButton,
  Group,
  Text,
  Popover,
  Paper,
  Divider,
  Stack,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { useState } from "react";

import classes from "./ActionsBox.module.css";
export default function ActionsBox({ options, children, onClick }) {
  const [opened, setOpened] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(colorScheme);
  const iconColor = computedColorScheme === "dark" ? "dark.0" : "black";

  const handleOptionClick = (value) => {
    onClick(value);
    setOpened(false);
  };

  const postOptions = (
    <Paper p={0}>
      <Stack gap={0}>
        {options.map((item, index) => {
          const withDivider = index < options.length - 1;
          return (
            <>
              <UnstyledButton
                display="block"
                py={12}
                px={16}
                w={150}
                key={item.value}
                className={classes.styledButton}
                onClick={() => handleOptionClick(item.value)}
              >
                <Group gap={10}>
                  <Image src={item.icon} w={15} h={15} fit="contain"></Image>
                  <Text size="sm" c={item.textColor} fw={500}>
                    {item.label}
                  </Text>
                </Group>
              </UnstyledButton>
              {withDivider && <Divider />}
            </>
          );
        })}
      </Stack>
    </Paper>
  );

  return (
    <Popover position="bottom-end" opened={opened} onChange={setOpened}>
      <Popover.Target>
        <ActionIcon
          radius="xl"
          variant="subtle"
          color={iconColor}
          onClick={() => setOpened((o) => !o)}
        >
          {children}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p={0}>{postOptions}</Popover.Dropdown>
    </Popover>
  );
}

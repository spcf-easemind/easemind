import {
  Box,
  Image,
  UnstyledButton,
  Group,
  Text,
  Popover,
} from "@mantine/core";

import IconPostOption from "../assets/icons/buttons/IconPostOption.svg"

import classes from "./ActionsBox.module.css"

export default function ActionModal({ options }) {
  const postOptions = options.map((item, index) => {
    const borderStyling = index === 1 ? null : classes.borderStyling;
    return (
      <Box
        key={item.value}
        style={{
          position: "relative",
        }}
      >
        <UnstyledButton w={125} my={13}>
          <Group gap={10}>
            <Image src={item.icon} w={15} h={15}></Image>
            <Text size="sm" c="var(--mantine-color-gray-7)" fw={500}>
              {item.label}
            </Text>
          </Group>
          <span className={borderStyling} />
        </UnstyledButton>
      </Box>
    );
  });

  return (
    <Popover position="bottom-end">
      <Popover.Target>
        <UnstyledButton>
          <Image src={IconPostOption} />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown py={0}>{postOptions}</Popover.Dropdown>
    </Popover>
  );
}

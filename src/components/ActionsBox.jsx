import {
  Box,
  Image,
  UnstyledButton,
  Group,
  Text,
  Popover,
  Paper,
  Divider,
} from "@mantine/core";

import classes from "./ActionsBox.module.css";
export default function ActionsBox({ options, children }) {
  const postOptions = (
    <Paper>
      {options.map((item, index) => {
        const withDivider = index < options.length - 1;
        return (
          <UnstyledButton
            w={125}
            my={13}
            key={item.value}
            className={classes.styledButton}
          >
            <Group gap={10}>
              <Image src={item.icon} w={15} h={15} fit="contain"></Image>
              <Text size="sm" c="gray.7" fw={500}>
                {item.label}
              </Text>
            </Group>
            {withDivider && <Divider />}
          </UnstyledButton>
        );
      })}
    </Paper>
  );

  return (
    <Popover position="bottom-end">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown py={0}>{postOptions}</Popover.Dropdown>
    </Popover>
  );
}

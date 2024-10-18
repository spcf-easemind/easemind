import {
  Box,
  Image,
  UnstyledButton,
  Group,
  Text,
  Popover,
  Paper,
  Divider,
  Stack,
} from "@mantine/core";

import classes from "./ActionsBox.module.css";
export default function ActionsBox({ options, children }) {
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
    <Popover position="bottom-end">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown p={0}>{postOptions}</Popover.Dropdown>
    </Popover>
  );
}

import {
  Paper,
  Image,
  Group,
  Text,
  Collapse,
  Box,
  UnstyledButton,
} from "@mantine/core";

import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export default function DropDown({
  icon,
  label,
  instance,
  children,
  ...props
}) {
  const [opened, { toggle }] = useDisclosure(false);

  const IconInstance = opened ? IconChevronUp : IconChevronDown;

  return (
    <Box>
      <UnstyledButton onClick={toggle} w="100%">
        <Paper
          p={16}
          radius="md"
          style={{
            backgroundColor: "var(--mantine-primary-color-0)",
          }}
        >
          <Group>
            <Image w={20} h={20} src={icon} />
            <Text flex={1}>{label}</Text>
            <IconInstance />
          </Group>
        </Paper>
      </UnstyledButton>

      <Collapse
        transitionDuration={200}
        transitionTimingFunction="linear"
        py={16}
        in={opened}
      >
        {children}
      </Collapse>
    </Box>
  );
}

import { Image, UnstyledButton, Text, Group, Box } from "@mantine/core";
import classes from "./NavLinks.module.css";
import { hi } from "date-fns/locale";

export default function NavLinks({
  active,
  icon,
  label,
  onSelect,
  type = null,
  ...props
}) {
  const { w, h } = type === "profile" ? { w: 24, h: 24 } : { w: 35, h: 30 };
  const { boxW, boxH } =
    type === "profile" ? { boxW: 35, boxH: 25 } : { boxW: 40, boxH: undefined };
  return (
    <UnstyledButton
      className={classes.linkStyling}
      data-active={active === label || undefined}
      p={16}
      onClick={() => onSelect()}
      {...props}
    >
      <Group gap={10} align="center">
        <Box w={boxW} h={boxH}>
          <Image
            display="inline-block"
            src={icon}
            w={w}
            h={h}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

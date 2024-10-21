import {
  Card,
  Group,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import ActionsBox from "../ActionsBox";
import { IconDotsVertical } from "@tabler/icons-react";
import { EDIT_DELETE } from "../../static/popover";
import classes from "./TaskCard.module.css";

const popoverOptions = EDIT_DELETE;

export default function TaskCard({ onPopoverClick }) {
  const { colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(colorScheme);
  const iconColor = computedColorScheme === "dark" ? "white" : "black";
  return (
    <Card radius="lg" className={classes.cardBg} withBorder>
      <Group>
        <Text flex={1}>Task Sample</Text>
        <ActionsBox onClick={onPopoverClick} options={popoverOptions}>
          <IconDotsVertical color={iconColor} size={30} stroke={1.5} />
        </ActionsBox>
      </Group>
    </Card>
  );
}

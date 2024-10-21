import { Box, Card, Group, Text } from "@mantine/core";
import classes from "./CreateButtonCard.module.css";
export default function CreateButtonCard({
  onClick,
  children,
  px = 16,
  py = 16,
  size = "md",
  imageSize = 25,
}) {
  return (
    <Card
      px={px}
      py={py}
      withBorder
      className={classes.cardBg}
      radius="lg"
      component="button"
      w="100%"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Group>
        <Box
          className={classes.cardImage}
          alt="Create a group"
          w={imageSize}
          h={imageSize}
        ></Box>
        <Text size={size}>{children}</Text>
      </Group>
    </Card>
  );
}

import { Card, Title, Text } from "@mantine/core";
import classes from "./HeadingCard.module.css";

export default function HeadingCard({ title, description }) {
  return (
    <Card padding={16} withBorder radius="lg" ta="center" bg="" className={classes.card} >
      <Title order={2} mb={description ? 8 : undefined}>
        {title}
      </Title>
      {description && <Text size="sm">{description}</Text>}
    </Card>
  );
}

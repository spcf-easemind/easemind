import { Card, Group, Stack, Title, Text, Divider, Box } from "@mantine/core";
import ActionsBox from "../../ActionsBox";
import { IconDotsVertical } from "@tabler/icons-react";
import { EDIT_DELETE } from "../../../static/popover";
import classes from "./DiaryCard.module.css";

export default function DiaryCard({ onClick }) {
  const popoverOptions = EDIT_DELETE;

  return (
    <Card className={classes.cardBg} radius="lg" withBorder>
      <Box pos="relative">
        <Group wrap="no-wrap">
          <Stack gap={8} align="center" py={16} px={32}>
            <Text>Oct</Text>
            <Title order={1}>21</Title>
            <Text>2024</Text>
          </Stack>
          <Divider color="sky-blue.2" orientation="vertical" />
          <Stack gap={8}>
            <Title order={4}>A Day of Reflection and Small Wins</Title>
            <Text lh={1.2}>
              Today was a mix of ups and downs, but I’m proud of the small
              victories I achieved. I started the morning feeling a bit
              overwhelmed with my to-do list, but after breaking tasks into
              smaller steps, I managed to get more done than I expected. I took
              a short walk in the afternoon, which really helped clear my head
              and boost my mood. I also spent some time journaling, reflecting
              on how far I've come. While I didn’t accomplish everything I set
              out to do, I’m learning to be kinder to myself and celebrate the
              little wins.
            </Text>
          </Stack>
        </Group>
        <Box pos="absolute" top={0} right={0}>
          <ActionsBox onClick={onClick} options={popoverOptions}>
            <IconDotsVertical size={30} stroke={1.5} />
          </ActionsBox>
        </Box>
      </Box>
    </Card>
  );
}

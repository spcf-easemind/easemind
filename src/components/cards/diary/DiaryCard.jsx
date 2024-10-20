import { Card, Group, Stack, Title, Text, Divider, Box } from "@mantine/core";
import ActionsBox from "../../ActionsBox";
import { IconDotsVertical } from "@tabler/icons-react";
import { EDIT_DELETE } from "../../../static/popover";

export default function DiaryCard({ onClick }) {
  const popoverOptions = EDIT_DELETE;

  return (
    <Card bg="gray.0" radius="lg" withBorder>
      <Box pos="relative">
        <Group wrap="no-wrap">
          <Stack gap={8} align="center" py={16} px={32}>
            <Text>Jan</Text>
            <Title order={1}>24</Title>
            <Text>2024</Text>
          </Stack>
          <Divider color="sky-blue.2" orientation="vertical" />
          <Stack gap={8}>
            <Title order={4}>TITLE OF CONTENT</Title>
            <Text lh={1.2}>
              Today was a blend of productivity and relaxation. I woke up early
              and decided to go for a brisk walk in the park. The autumn leaves
              were stunning, with shades of orange and yellow everywhere. After
              breakfast, I tackled my to-do list and finished a project I've
              been working on for weeks. It felt great to cross that off! In the
              afternoon, I took some time to read a book I've been enjoying—such
              a nice escape.....
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

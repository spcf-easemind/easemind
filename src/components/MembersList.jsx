import {
  Group,
  Stack,
  UnstyledButton,
  Text,
  Box,
  Card,
  Image,
} from "@mantine/core";

import { IconPlus } from "@tabler/icons-react";
// import HappyImage from "../assets/HappyImage.jpg";

export default function MembersList({ instance }) {
  const membersInstance = instance.map((member) => (
    <Box key={member.name}>
      <Group>
        <Image src={member.image} w={44} h={44} radius="md" />

        <div>
          <Text fw={500}>{member.name}</Text>
          <Text size="xs" c="dimmed">
            {member.role}
          </Text>
        </div>
      </Group>
    </Box>
  ));

  return (
    <Stack>
      <UnstyledButton>
        <Box>
          <Group>
            <Card
              padding={10}
              radius="md"
              style={{
                backgroundColor: "var(--mantine-primary-color-0)",
              }}
            >
              <IconPlus />
            </Card>

            <Text fw={500}>Add member</Text>
          </Group>
        </Box>
      </UnstyledButton>

      {membersInstance}
    </Stack>
  );
}

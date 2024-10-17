import {
  Box,
  Card,
  Title,
  ActionIcon,
  Image,
  Stack,
  Grid,
  Button,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import HappyImage from "../../assets/HappyImage.jpg";

export default function PhotoControlCard() {
  const navigate = useNavigate();
  return (
    <Card withBorder bg="gray.0" ta="center">
      <Box pos="relative">
        <ActionIcon
          onClick={() => navigate(-1)}
          variant="transparent"
          color="black"
          pos="absolute"
          top={0}
          left={0}
        >
          <IconChevronLeft size={30} stroke={1.5} />
        </ActionIcon>
        <Title order={2} mb={10}>
          {/* Title */}
          Add Photo
        </Title>
      </Box>

      {/* Content */}
      <Stack
        gap={40}
        align="center"
        px={{ base: 20, md: 40, lg: 60, xl: 100 }}
        mt={24}
      >
        <Image w={200} h={200} src={HappyImage} radius="md" />

        <Grid>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid.Col key={index} span={4}>
              <UnstyledButton>
                <Image
                  src={HappyImage}
                  w="100%"
                  h="auto"
                  fit="contain"
                  radius="md"
                />
              </UnstyledButton>
            </Grid.Col>
          ))}
        </Grid>

        <Button fullWidth size="md">
          Save
        </Button>
      </Stack>
    </Card>
  );
}

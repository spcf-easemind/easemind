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
  Avatar,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./PhotoControlCard.module.css";

export default function PhotoControlCard({ images, onSubmit }) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImageClick(image) {
    setSelectedImage(image);
  }

  function handleSubmit() {
    if (selectedImage) {
      onSubmit(selectedImage);
    }
  }

  const imageInstances = images.map((image) => {
    return (
      <Grid.Col key={image.key} span="auto">
        <UnstyledButton onClick={() => handleImageClick(image.value)}>
          <Image src={image.value} w="100%" h="auto" fit="cover" radius="md" />
        </UnstyledButton>
      </Grid.Col>
    );
  });

  return (
    <Card className={classes.cardBg} ta="center">
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
        {<Avatar w={150} h={150} src={selectedImage} radius="md" />}

        <Grid>{imageInstances}</Grid>

        <Button fullWidth size="md" onClick={handleSubmit}>
          Save
        </Button>
      </Stack>
    </Card>
  );
}

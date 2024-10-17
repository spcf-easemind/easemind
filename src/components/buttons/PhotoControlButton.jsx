import { Card, Stack, Text, Image } from "@mantine/core";
import IconCamera from "../../assets/icons/dropzone/IconCamera.svg";

export default function PhotoControlButton({ onClick }) {
  return (
    <Card
      component="button"
      onClick={onClick}
      withBorder
      radius="md"
      w={100}
      h={100}
      style={{
        cursor: "pointer",
        justifyContent: "center",
      }}
    
    >
      <Stack align="center" justify="space-between">
        <Image src={IconCamera} w={25} h={25} />
        <Text size="xs" c="dimmed">
          Add a photo
        </Text>
      </Stack>
    </Card>
  );
}

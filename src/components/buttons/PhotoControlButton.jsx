import { Card, Stack, Text, Image } from "@mantine/core";
import IconCamera from "../../assets/icons/dropzone/IconCamera.svg";
import TextValidation from "../validation/TextValidation";

export default function PhotoControlButton({ formError, image, onClick }) {
  return (
    <>
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
          borderColor: formError ? "var(--mantine-color-red-5)" : undefined,
        }}
      >
        <Stack align="center" justify="space-between">
          {(image && <Image src={image} w="100%" h="100%" />) || (
            <>
              {" "}
              <Image src={IconCamera} w={25} h={25} />
              <Text size="xs" c="dimmed">
                Add a photo
              </Text>{" "}
            </>
          )}
        </Stack>
      </Card>
      <TextValidation formError={formError} />
    </>
  );
}

import { Stack, Image, Text } from "@mantine/core";
import {
  Dropzone as MantineDropzone,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import IconCamera from "../assets/icons/dropzone/IconCamera.svg";
import { useState } from "react";
export default function Dropzone() {
  const [image, setImage] = useState(null);

  console.log(image);

  return (
    <MantineDropzone
      w={100}
      h={100}
      radius="md"
      style={{
        borderStyle: "solid",
      }}
      onDrop={(files) => setImage(URL.createObjectURL(files[0]))}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Stack align="center">
        <Image src={IconCamera} w={25} h={25} />
        <MantineDropzone.Accept>
          <Image src={image} w={25} h={25} />
        </MantineDropzone.Accept>
        <MantineDropzone.Reject>
          <Text size="xs" c="dimmed">
            5mb limit
          </Text>
        </MantineDropzone.Reject>
        <MantineDropzone.Idle>
          <Text size="xs" c="dimmed">
            Add a photo
          </Text>
        </MantineDropzone.Idle>
      </Stack>
    </MantineDropzone>
  );
}

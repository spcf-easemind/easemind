import {
  Box,
  Group,
  TextInput,
  UnstyledButton,
  Image,
  Button,
  Card,
} from "@mantine/core";

import IconEmoticon from "../../assets/icons/input/IconEmoticon.svg";
import IconImage from "../../assets/icons/input/IconImage.svg";
import IconPaperClip from "../../assets/icons/input/IconPaperClip.svg";

import { forwardRef, useRef } from "react";

const icons = [
  {
    name: "emoticon",
    svg: IconEmoticon,
    action: "",
  },
  {
    name: "image",
    svg: IconImage,
    action: "image",
  },
  {
    name: "paper-clip",
    svg: IconPaperClip,
    action: "file",
  },
];

const ChatInput = forwardRef(({ form, onSubmit, onUpload, ...props }, ref) => {
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  function handleSubmit(formData) {
    onSubmit(formData);
  }

  function handleUploadFile(files) {
    console.log(files);
    onUpload(files);
  }

  // Handle icon click for image and file
  function handleIconClick(action) {
    console.log(action);
    if (action === "image") {
      // Trigger image input
      imageInputRef.current.click();
    } else if (action === "file") {
      // Trigger file input
      fileInputRef.current.click();
    }
  }

  const groupIcons = (
    <Group justify="center" wrap="no-wrap">
      {icons.map((icon) => (
        <UnstyledButton
          onClick={() => {
            handleIconClick(icon.action);
          }}
          key={icon.name}
        >
          <Image src={icon.svg} />
        </UnstyledButton>
      ))}
    </Group>
  );

  const sendButton = (
    <Button type="submit" size="sm" radius="xl">
      Send
    </Button>
  );

  return (
    <Box {...props}>
      <Card
        withBorder
        radius="xl"
        py={0}
        pl={10}
        pr={8}
        style={{
          backgroundColor: "var(--mantine-color-gray-1)",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group>
            {groupIcons}
            <TextInput
              flex={1}
              ref={ref}
              size="lg"
              variant="unstyled"
              key={form.key("message")}
              {...form.getInputProps("message")}
            />
            {sendButton}

            {/* Hidden file inputs for image and file */}
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                // Handle the selected image file
                const files = e.target.files;
                handleUploadFile(files);
              }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                // Handle the selected file
                const files = e.target.files;
                handleUploadFile(files);
              }}
            />
          </Group>
        </form>
      </Card>
    </Box>
  );
});

export default ChatInput;

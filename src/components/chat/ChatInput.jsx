import {
  Box,
  Group,
  TextInput,
  UnstyledButton,
  Image,
  Button,
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

const ChatInput = forwardRef(({ form, onSubmit, ...props }, ref) => {
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  function handleSubmit(formData) {
    onSubmit(formData);
  }

  // Handle icon click for image and file
  function handleIconClick(action) {
    console.log(action);
    if (action === "image") {
      imageInputRef.current.click(); // Trigger image input
    } else if (action === "file") {
      fileInputRef.current.click(); // Trigger file input
    }
  }

  const groupIcons = (
    <Group ml={12} justify="center" wrap="no-wrap">
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
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <TextInput
          ref={ref}
          leftSection={groupIcons}
          rightSection={sendButton}
          size="lg"
          variant="filled"
          radius="xl"
          styles={{
            input: {
              paddingLeft: "8%",
              border: "1px solid var(--mantine-color-gray-3)",
            },
            section: {
              width: 100,
            },
          }}
          key={form.key("message")}
          {...form.getInputProps("message")}
        />

        {/* Hidden file inputs for image and file */}
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            // Handle the selected image file
            const file = e.target.files[0];
            if (file) {
              console.log("Selected image:", file);
            }
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            // Handle the selected file
            const file = e.target.files[0];
            if (file) {
              console.log("Selected file:", file);
            }
          }}
        />
      </form>
    </Box>
  );
});

export default ChatInput;

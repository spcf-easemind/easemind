import {
  Box,
  Group,
  TextInput,
  UnstyledButton,
  Image,
  Button,
  Card,
  Popover,
} from "@mantine/core";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import IconEmoticon from "../../assets/icons/input/IconEmoticon.svg";
import IconImage from "../../assets/icons/input/IconImage.svg";
import IconPaperClip from "../../assets/icons/input/IconPaperClip.svg";

import { forwardRef, useRef } from "react";

const icons = [
  {
    name: "emoticon",
    svg: IconEmoticon,
    action: "emoticon",
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

  function handleSelectEmoji(emoji) {
    const cursor = ref.current.selectionStart
    const message = ref.current.value.slice(0, cursor) + emoji.native + ref.current.value.slice(cursor)
    ref.current.value = message
    console.log(ref.current.value)
  }

  const groupIcons = (
    <Group justify="center" wrap="no-wrap">
      {icons.map((icon) =>
        icon.name === "emoticon" ? (
          <Popover.Target>
            <UnstyledButton key={icon.name}>
              <Image src={icon.svg} />
            </UnstyledButton>
          </Popover.Target>
        ) : (
          <UnstyledButton
            onClick={() => {
              handleIconClick(icon.action);
            }}
            key={icon.name}
          >
            <Image src={icon.svg} />
          </UnstyledButton>
        )
      )}
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
        <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
          <Popover trapFocus withArrow position="top-start">
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
              <Popover.Dropdown>
                <Picker
                  data={data}
                  onEmojiSelect={handleSelectEmoji}
                  emojiVersion="15"
                />
              </Popover.Dropdown>

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
            </Group>
          </Popover>
        </form>
      </Card>
    </Box>
  );
});

export default ChatInput;

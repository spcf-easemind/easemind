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

import { forwardRef, useEffect, useRef, useState } from "react";

const icons = [
  {
    name: "emoticon",
    svg: IconEmoticon,
    action: "",
  },
  {
    name: "image",
    svg: IconImage,
    action: "media",
  },
  {
    name: "paper-clip",
    svg: IconPaperClip,
    action: "file",
  },
];

const ChatInput = forwardRef(({ form, onSubmit, onUpload, ...props }, ref) => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  function handleSubmit(formData) {
    onSubmit(formData);
  }

  function handleUploadFile(files) {
    const fileData = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;

      // Determine the type of each file based on its MIME type
      if (fileType.startsWith("image/")) {
        fileData.push({ type: "image", file });
      } else if (fileType.startsWith("video/")) {
        fileData.push({ type: "video", file });
      } else {
        fileData.push({ type: "document", file });
      }
    }

    // Pass all categorized files to the onUpload handler
    onUpload(fileData);
  }

  // Handle icon click for image and file
  function handleIconClick(action) {
    console.log(action);
    if (action === "media") {
      // Trigger image input
      imageInputRef.current.click();
    } else if (action === "file") {
      // Trigger file input
      fileInputRef.current.click();
    }
  }

  function handleSelectEmoji(emoji) {
    const cursor = ref.current.selectionStart;
    ref.current.value =
      ref.current.value.slice(0, cursor) +
      emoji.native +
      ref.current.value.slice(cursor);

    setCursorPosition(cursor + emoji.native.length);

    form.setFieldValue("message", ref.current.value);
  }

  useEffect(() => {
    ref.current.focus();
    ref.current.setSelectionRange(cursorPosition, cursorPosition);
  }, [cursorPosition]);

  const groupIcons = (
    <Group justify="center" wrap="no-wrap">
      {icons.map((icon) =>
        icon.name === "emoticon" ? (
          <Popover.Target key={icon.name}>
            <UnstyledButton>
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
                accept="image/*,video/*"
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
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                style={{ display: "none" }}
                onChange={(e) => {
                  // Handle the selected file
                  const files = e.target.files;
                  handleUploadFile(files);
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

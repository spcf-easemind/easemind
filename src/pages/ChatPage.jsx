import { Flex } from "@mantine/core";

import ChatHeader from "../components/headers/ChatHeader.jsx";
import ChatBody from "../components/chat/ChatBody.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";

import { useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { useDialogStore } from "../store/dialog.js";
import { useShallow } from "zustand/shallow";

const padding = 18;

// Here to Call Zustand Data

const data = [
  {
    id: 1,
    name: "Alexander Camaddo",
    message: ["O komusta ka par!"],
    created_at: "12:00 am",
  },
  {
    id: 2,
    name: "Gabriel Gatbonton",
    message: ["Oini, mayap mu!", "Komusta ka?"],
    created_at: "1:00 am",
  },
];

export default function ChatPage() {
  // Convo Zustand
  const [convo, setConvo] = useState(data);

  // Boiler Plate Constants
  const currentDate = new Date().toISOString();
  const user = "Gabriel Gatbonton";
  const inputRef = useRef();

  // Aside Controls
  const { toggleMobile, toggleDesktop } = useDialogStore(
    useShallow((state) => ({
      toggleMobile: state.toggleAsideMobile,
      toggleDesktop: state.toggleAsideDesktop,
    }))
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      id: "",
      name: user,
      message: [],
      created_at: currentDate,
    },
    validate: {
      message: (value) => !value.trim().length && "",
    },
  });

  // Here to Call Zustand Function
  function handleFormSubmit(formData) {
    const data = { ...formData };
    const arrayLength = convo.length;

    data.id = arrayLength + 1;
    data.message = [data.message];

    setConvo((oldVal) => [...oldVal, data]);

    form.setFieldValue("message", " ");

    inputRef.current.focus();
  }

  return (
    <Flex direction="column" w="100%" h="inherit">
      <ChatHeader onClick={{ toggleDesktop, toggleMobile }} p={padding} />
      <ChatBody data={convo} p={padding} flex={1} />
      <ChatInput
        ref={inputRef}
        form={form}
        onSubmit={handleFormSubmit}
        py={padding}
        px={24}
      />
    </Flex>
  );
}

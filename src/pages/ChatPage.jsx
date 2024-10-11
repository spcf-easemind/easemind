import { Flex, Stack, MultiSelect } from "@mantine/core";

import ChatHeader from "../components/headers/ChatHeader.jsx";
import ChatBody from "../components/chat/ChatBody.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";
import ChatModal from "../components/modals/ChatModal.jsx";
import CheckboxList from "../components/CheckboxList.jsx";

import HappyImage from "../assets/HappyImage.jpg";

import { useRef, useState } from "react";
import { useForm, hasLength } from "@mantine/form";
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
  {
    id: 3,
    name: "Alexander Camaddo",
    message: ["O reni, reng litratu kailangan mu."],
    created_at: "4:00 am",
  },
  {
    id: 4,
    name: "Alexander Camaddo",
    images: [HappyImage, HappyImage, HappyImage, HappyImage, HappyImage],
    created_at: "4:01 am",
  },
  {
    id: 5,
    name: "Gabriel Gatbonton",
    message: ["Oini, mayap mu!", "Komusta ka?"],
    created_at: "1:00 am",
  },
  {
    id: 6,
    name: "Gabriel Gatbonton",
    message: ["Oini, mayap mu!", "Komusta ka?"],
    created_at: "1:00 am",
  },
  {
    id: 7,
    name: "Gabriel Gatbonton",
    message: ["Oini, mayap mu!", "Komusta ka?"],
    created_at: "1:00 am",
  },
];

const new_friends = [
  {
    id: 1,
    name: "Alexander Camaddo",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
  },
  {
    id: 2,
    name: "Gabriel Gatbonton",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
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

  // Modal
  const { chatModal, toggleChatModal } = useDialogStore(
    useShallow((state) => ({
      chatModal: state.chatModal,
      toggleChatModal: state.toggleChatModal,
    }))
  );

  //

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

  const addMembersForm = useForm({
    mode: "controlled",
    initialValues: {
      members: [],
    },
    validate: {
      members: hasLength({ min: 1 }, "Value is to be selected"),
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

  function handleAddMembers(formData) {
    console.log(formData);
  }

  return (
    <Flex direction="column" w="100%" h="100%">
      <ChatHeader onClick={{ toggleDesktop, toggleMobile }} p={padding} />
      <ChatBody data={convo} p={padding} flex={1} h="inherit" />
      <ChatInput
        ref={inputRef}
        form={form}
        onSubmit={handleFormSubmit}
        py={padding}
        px={16}
      />

      {/* Modal */}
      <ChatModal
        modal={{ opened: chatModal, onClose: toggleChatModal }}
        title="Add member"
        buttonLabel="Add member"
        onSubmit={addMembersForm.onSubmit(handleAddMembers)}
      >
        <Stack>
          {/* <Combobox
            data={new_friends.map(({ name }) => name)}
            value={addMembersForm.values.members}
            onChange={(val) => addMembersForm.setFieldValue("members", val)}
          /> */}
          <MultiSelect
            placeholder="Search"
            rightSection={" "}
            size="lg"
            searchable
            {...addMembersForm.getInputProps("members")}
            data={new_friends.map(({ name }) => name)}
            styles={{
              pill: {
                borderRadius: 5,
                backgroundColor: "var(--mantine-primary-color-5)",
                color: "white",
              },
            }}
          />

          <CheckboxList
            label="Engaged with these people"
            checkboxes={new_friends}
            {...addMembersForm.getInputProps("members")}
          />
        </Stack>
      </ChatModal>
    </Flex>
  );
}

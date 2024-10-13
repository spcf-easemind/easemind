import { Flex, Stack, MultiSelect } from "@mantine/core";

import ChatHeader from "../components/headers/ChatHeader.jsx";
import ChatBody from "../components/chat/ChatBody.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";
import ChatModal from "../components/modals/ChatModal.jsx";
import CheckboxList from "../components/CheckboxList.jsx";

import HappyImage from "../assets/HappyImage.jpg";

import { useEffect, useRef } from "react";
import { useForm, hasLength } from "@mantine/form";
import { useDialogStore } from "../store/dialog.js";
import { useShallow } from "zustand/shallow";
import { useChatStore } from "../store/chat.js";
import { useAuthenticationStore } from "../store/authentication.js";
import { useParams } from "react-router-dom";

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
  const { chatRef } = useParams();
  const loggedUser = useAuthenticationStore((state) => state.user.data);
  const {
    fetchChats,
    getChatPageData,
    chats,
    sendMessage,
    listenForMessages,
    unsubscribeFromChat,
  } = useChatStore(
    useShallow((state) => ({
      fetchChats: state.fetchChats,
      getChatPageData: state.getChatPageData,
      sendMessage: state.sendMessage,
      chats: state.chats,
      listenForMessages: state.listenForMessages,
      unsubscribeFromChat: state.unsubscribeFromChat,
    }))
  );

  useEffect(() => {
    if (loggedUser.key) fetchChats(loggedUser.key);
  }, []);

  useEffect(() => {
    if (chatRef) {
      console.log("Subscribing to chat");
      listenForMessages(chatRef);
    }

    return () => {
      console.log("Unsubscribing from chat");
      unsubscribeFromChat(chatRef);
    };
  }, [chatRef]);

  // Variables
  const inputRef = useRef();
  const { header, chatMessages } = getChatPageData(chatRef);

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

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userKey: loggedUser.key,
      name: loggedUser.fullName,
      message: "",
      type: "text",
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
  async function handleSendMessage(formData) {
    const data = { ...formData };

    sendMessage(chatRef, data)
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(() => {
        form.setFieldValue("message", " ");
        inputRef.current.focus();
      });
  }

  function handleAddMembers(formData) {
    console.log(formData);
  }

  return (
    <>
      <Flex direction="column" w="100%" h="100%">
        <ChatHeader
          header={header}
          onClick={{ toggleDesktop, toggleMobile }}
          p={padding}
        />
        <ChatBody data={chatMessages} p={padding} h="inherit" />
        <ChatInput
          ref={inputRef}
          form={form}
          onSubmit={handleSendMessage}
          py={padding}
          px={16}
        />
      </Flex>
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
    </>
  );
}

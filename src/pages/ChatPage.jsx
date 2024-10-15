import { Flex, Stack, MultiSelect } from "@mantine/core";

import ChatHeader from "../components/headers/ChatHeader.jsx";
import ChatBody from "../components/chat/ChatBody.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";
import ChatModal from "../components/modals/ChatModal.jsx";
import CheckboxList from "../components/CheckboxList.jsx";

import { useEffect, useRef } from "react";
import { useForm, hasLength } from "@mantine/form";
import { useDialogStore } from "../store/dialog.js";
import { useShallow } from "zustand/shallow";
import { useChatStore } from "../store/chat.js";
import { useAuthenticationStore } from "../store/authentication.js";
import { useParams } from "react-router-dom";
import useListener from "../hooks/useListener.jsx";

const padding = 18;

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
  // React Router
  const { chatRef } = useParams();
  // Zustand
  const loggedUser = useAuthenticationStore((state) => state.user.data);
  const {
    sendMessage,
    listenForMessages,
    unsubscribeFromChat,
    uploadImage,
    chat,
    queryAsideData,
    queryChatData,
  } = useChatStore(
    useShallow((state) => ({
      chat: state.chat,
      sendMessage: state.sendMessage,
      listenForMessages: state.listenForMessages,
      unsubscribeFromChat: state.unsubscribeFromChat,
      uploadImage: state.uploadImage,
      queryAsideData: state.queryAsideData,
      queryChatData: state.queryChatData,
    }))
  );

  // Event Listener
  const { header, chatMessages } = useListener({
    chat,
    chatRef,
    queryFn: queryChatData,
    listenerFn: listenForMessages,
    unsubscribeFn: unsubscribeFromChat,
  });

  // console.log(header, chatMessages);

  // Variables
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

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userKey: loggedUser.key,
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

  async function handleUploadFile(files) {

    console.log(files);
    // const formData = {
    //   userKey: form.getValues().userKey,
    //   type: "image",
    //   file: files[0],
    // };

    // uploadImage(chatRef, formData).catch((error) => {
    //   console.error("Error", error);
    // });
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
          onUpload={handleUploadFile}
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

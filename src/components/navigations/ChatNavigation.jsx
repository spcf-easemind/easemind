import {
  Group,
  Tooltip,
  UnstyledButton,
  useMatches,
  Title,
  Image,
  Input,
  Tabs,
  Stack,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

import IconConnect from "../../assets/icons/chat/IconConnect.svg";
import IconSearch from "../../assets/icons/chat/IconSearch.svg";

import classes from "../chat/ChatList.module.css";

import ChatList from "../chat/ChatList";

import { useChatStore } from "../../store/chat";
import { useShallow } from "zustand/shallow";
import { useNavigate, useLocation } from "react-router-dom";
import { useDialogStore } from "../../store/dialog";
// import useListener from "../hooks/useListener";

const tabsAttributes = [
  {
    value: "peers",
    label: "Peers",
  },
  {
    value: "groups",
    label: "Groups",
  },
];

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("peers");
  const [activeChat, setActiveChat] = useState();

  // Zustand
  const { getNavChats, chat } = useChatStore(
    useShallow((state) => ({
      findNewChatFn: state.findNewChat,
      getNavChats: state.getNavChats,
      chat: state.chat,
    }))
  );

  const findChatModalFn = useDialogStore((state) => state.toggleFindChatModal);

  useEffect(() => {
    const response = location.pathname.split("/");
    const computed = response && response[2] ? response[2] : null;
    setActiveChat(computed);
  }, [location]);

  function handleChatSelect(id) {
    navigate("/chat/" + id);
    setActiveChat(id);
  }

  const navChats = useMemo(() => {
    console.log("Recomputing");
    console.log(getNavChats());
    return getNavChats();
  }, [chat]);

  const tabsHeader = tabsAttributes.map((item) => {
    const isActive = activeTab === item.value;
    return (
      <Tabs.Tab
        value={item.value}
        key={item.value}
        size="lg"
        c={
          isActive
            ? "var(--mantine-primary-color-5)"
            : "var(--mantine-color-gray-6)"
        }
        fw={isActive ? 500 : 400}
        fz="md"
        className={classes.tabStyling}
        data-active={isActive || undefined}
      >
        {item.label}
      </Tabs.Tab>
    );
  });

  const tabsContent = tabsAttributes.map((item) => {
    return (
      <Tabs.Panel value={item.value} key={item.value}>
        <Stack mt={16} gap={8}>
          {item.label === "Peers"
            ? navChats.privateChat.map((chat) => (
                <ChatList
                  {...chat}
                  key={chat.id}
                  onSelectChat={handleChatSelect}
                  activeChat={activeChat}
                />
              ))
            : navChats.groupChat.map((chat) => (
                <ChatList
                  {...chat}
                  key={chat.id}
                  onSelectChat={handleChatSelect}
                  activeChat={activeChat}
                />
              ))}
        </Stack>
      </Tabs.Panel>
    );
  });

  const navbarTitleFontSize = useMatches({
    base: 25,
  });

  return (
    <>
      <Group w="100%" justify="space-between">
        <Title size={navbarTitleFontSize}>Messages</Title>
        <Tooltip label="Connect with someone" position="bottom">
          <UnstyledButton onClick={findChatModalFn}>
            <Image src={IconConnect} w={30} />
          </UnstyledButton>
        </Tooltip>
      </Group>

      <Input
        py={15}
        size="md"
        placeholder="Search"
        leftSectionPointerEvents="none"
        leftSection={
          <UnstyledButton>
            <Image src={IconSearch} />
          </UnstyledButton>
        }
      />

      <Tabs
        defaultValue={activeTab}
        onChange={setActiveTab}
        styles={{
          root: {
            "--tabs-list-border-width": "0px",
          },
        }}
      >
        <Tabs.List justify="space-around">{tabsHeader}</Tabs.List>
        {tabsContent}
      </Tabs>
    </>
  );
}

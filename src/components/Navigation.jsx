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
import { useEffect, useState } from "react";

import IconNewChat from "../assets/icons/chat/IconNewChat.svg";
import IconConnectCompanion from "../assets/icons/chat/IconConnect.svg";
import IconSearch from "../assets/icons/chat/IconSearch.svg";

import classes from "./chat/ChatList.module.css";

import ChatList from "./chat/ChatList";

import { useChatStore } from "../store/chat";
import { useShallow } from "zustand/shallow";
import { useNavigate, useLocation } from "react-router-dom";

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
  const { findNewChatFn, getNavChats, chats } = useChatStore(
    useShallow((state) => ({
      findNewChatFn: state.findNewChat,
      getNavChats: state.getNavChats,
      chats: state.chats,
    }))
  );

  useEffect(() => {
    const response = location.pathname.split("/");
    const computed = response && response[2] ? response[2] : null;
    setActiveChat(computed);
  }, [location]);

  function handleChatSelect(id) {
    navigate("/chat/" + id);
    setActiveChat(id);
  }

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
            ? getNavChats().privateChat.map((chat) => (
                <ChatList
                  {...chat}
                  key={chat.id}
                  onSelectChat={handleChatSelect}
                  activeChat={activeChat}
                />
              ))
            : getNavChats().groupChat.map((chat) => (
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

  function findNewChat() {
    const dummyData = {
      users: [
        {
          id: "IeDexac8elb3gZ90q5s3L",
          name: "Gabriel Alfonso",
          image:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
        },
        // {
        //   id: "4pnFyYuxhXBGQ5lzjHpKv",
        //   name: "Alexander Camaddo",
        //   image:
        //     "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
        // },
        {
          id: "CalhaQnIh3z3nOGIc6ysK",
          name: "ICTDU",
          image:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
        },
      ],
    };

    const usersObject = dummyData.users.reduce((acc, user) => {
      acc[user.id] = {
        name: user.name,
        image: user.image,
      };
      return acc;
    }, {});

    console.log(usersObject);

    findNewChatFn({ users: usersObject });
  }

  return (
    <>
      <Group w="100%" justify="space-between">
        <Title c="gray.8" size={navbarTitleFontSize}>
          Messages
        </Title>
        <Tooltip label="Connect with someone" position="bottom">
          <UnstyledButton onClick={() => findNewChat()}>
            <Image src={IconConnectCompanion} w={30} />
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

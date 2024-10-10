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
import { useState } from "react";

import IconNewChat from "../assets/icons/chat/IconNewChat.svg";
import IconConnectCompanion from "../assets/icons/chat/IconConnect.svg";
import IconSearch from "../assets/icons/chat/IconSearch.svg";

import { USER_CHATS, GROUP_CHATS } from "../static/chat";
import classes from "./chat/ChatList.module.css";

import ChatList from "./chat/ChatList";

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
  const [activeTab, setActiveTab] = useState("peers");
  const [activeChat, setActiveChat] = useState();

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
            ? USER_CHATS.map((chat) => (
                <ChatList
                  {...chat}
                  key={chat.id}
                  onSelectChat={setActiveChat}
                  activeChat={activeChat}
                />
              ))
            : GROUP_CHATS.map((chat) => (
                <ChatList
                  {...chat}
                  key={chat.id}
                  onSelectChat={setActiveChat}
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
        <Title c="gray.8" size={navbarTitleFontSize}>
          Messages
        </Title>
        <Tooltip label='Connect with someone' position="bottom">
          <UnstyledButton>
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

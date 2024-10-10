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

import IconNewChat from "../assets/icons/chat/IconNewChat.svg";
import IconConnectCompanion from "../assets/icons/chat/IconConnect.svg";
import IconSearch from "../assets/icons/chat/IconSearch.svg";

import { USER_CHATS, GROUP_CHATS } from "../static/chat";

import ChatList from "./ChatList";
import { useState } from "react";

const chatMenuAttributes = [
  {
    name: "new-chat",
    label: "New Chat",
    icon: IconNewChat,
  },
  {
    name: "connect-easecompanion",
    label: "Connect to an EaseCompanion",
    icon: IconConnectCompanion,
  },
];

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
  const chatMenuIcons = chatMenuAttributes.map((item) => {
    return (
      <Tooltip label={item.label} key={item.name} position="bottom">
        <UnstyledButton>
          <Image src={item.icon} w={30} />
        </UnstyledButton>
      </Tooltip>
    );
  });

  const tabsHeader = tabsAttributes.map((item) => {
    const isActive = activeTab === item.value;
    return (
      <Tabs.Tab
        value={item.value}
        key={item.value}
        size="lg"
        c={isActive ? "sky-blue" : "gray"}
        fw={isActive ? 600 : 300}
        fz="md"
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
                <ChatList {...chat} key={chat.userName} />
              ))
            : GROUP_CHATS.map((chat) => (
                <ChatList {...chat} key={chat.userName} />
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
        <Group gap={10}>{chatMenuIcons}</Group>
      </Group>

      <Input
        py={15}
        size="md"
        placeholder="Search"
        leftSection={<Image src={IconSearch} />}
      />

      <Tabs defaultValue={activeTab} onChange={setActiveTab}>
        <Tabs.List justify="space-around">{tabsHeader}</Tabs.List>
        {tabsContent}
      </Tabs>
    </>
  );
}

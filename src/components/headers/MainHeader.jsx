import { Group, UnstyledButton, Image, Tooltip } from "@mantine/core";

import IconHome from "../../assets/icons/header/IconHome.svg";
import IconHomeFilled from "../../assets/icons/header/IconHomeFilled.svg";
import IconChat from "../../assets/icons/header/IconChat.svg";
import IconChatFilled from "../../assets/icons/header/IconChatFilled.svg";
import IconAccount from "../../assets/icons/header/IconAccount.svg";
import IconAccountFilled from "../../assets/icons/header/IconAccountFilled.svg";

import classes from "./MainHeader.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuLinks = [
  {
    name: "home",
    label: "Home",
    route: "/home",
    icon: IconHome,
    iconFilled: IconHomeFilled,
  },
  {
    name: "chat",
    label: "Chat",
    route: "/chat",
    icon: IconChat,
    iconFilled: IconChatFilled,
  },
  {
    name: "profile",
    label: "Profile",
    route: "/profile",
    icon: IconAccount,
    iconFilled: IconAccountFilled,
  },
];

export default function MainHeader() {
  const navigate = useNavigate();
  const [active, setActive] = useState("chat");

  function handleMenuClick(name, route) {
    setActive(name);
    return navigate(route);
  }

  const menuInstances = menuLinks.map((item) => {
    const isActiveIcon = item.name === active ? item.iconFilled : item.icon;
    return (
      <Tooltip label={item.label} key={item.name}>
        <UnstyledButton
          data-active={item.name === active || undefined}
          onClick={() => handleMenuClick(item.name, item.route)}
          className={classes.menuIcon}
        >
          <Image src={isActiveIcon} w={24} />
        </UnstyledButton>
      </Tooltip>
    );
  });

  return (
    <Group h="100%" justify="center" align="center" gap={96}>
      {menuInstances}
    </Group>
  );
}

import { Group, UnstyledButton, Image, Tooltip } from "@mantine/core";

import IconHome from "../../assets/icons/header/IconHome.svg";
import IconHomeFilled from "../../assets/icons/header/IconHomeFilled.svg";
import IconChat from "../../assets/icons/header/IconChat.svg";
import IconChatFilled from "../../assets/icons/header/IconChatFilled.svg";
import IconAccount from "../../assets/icons/header/IconAccount.svg";
import IconAccountFilled from "../../assets/icons/header/IconAccountFilled.svg";

import classes from "./MainHeader.module.css";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthenticationStore } from "../../store/authentication";

const menuLinks = [
  {
    name: "home",
    label: "Home",
    route: "/home",
    icon: IconHome,
    iconFilled: IconHomeFilled,
    roles: ["EaseBuddy", "super-admin", "EaseCompanion"],
  },
  {
    name: "chat",
    label: "Chat",
    route: "/chat",
    icon: IconChat,
    iconFilled: IconChatFilled,
    roles: ["EaseBuddy", "super-admin", "EaseCompanion"],
  },
  {
    name: "profile",
    label: "Profile",
    route: "/edit-profile",
    icon: IconAccount,
    iconFilled: IconAccountFilled,
    roles: ["EaseBuddy", "super-admin", "EaseCompanion"],
  },
  {
    name: "miscellaneous",
    label: "Miscellaneous",
    route: "/miscellaneous",
    icon: IconAccount,
    iconFilled: IconAccountFilled,
    roles: ["super-admin"],
  },
];

export default function MainHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useAuthenticationStore((state) => state.user.data?.role);

  const [active, setActive] = useState();

  const currentLocation = () => {
    const filterVal = menuLinks.filter((item) =>
      location.pathname.startsWith(item.route)
    );
    const response = filterVal.length > 0 ? filterVal[0].name : null;
    setActive(response);
  };

  useEffect(() => {
    if (location) {
      currentLocation();
    }
  }, [location]);

  function handleMenuClick(name, route) {
    setActive(name);
    return navigate(route);
  }

  const menuInstances = menuLinks
    .filter(({ roles }) => roles.includes(role))
    .map((item) => {
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

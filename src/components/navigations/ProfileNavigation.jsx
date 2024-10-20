import IconEditProfile from "../../assets/icons/profile/IconEditProfile.svg";
import IconChangePassword from "../../assets/icons/profile/IconChangePassword.svg";
import IconOverview from "../../assets/icons/profile/IconOverview.svg";
import IconAnonymous from "../../assets/icons/profile/IconAnonymous.svg";
import IconTerms from "../../assets/icons/profile/IconTerms.svg";
import IconPrivacy from "../../assets/icons/profile/IconPrivacy.svg";
import IconAboutUs from "../../assets/icons/profile/IconAboutUs.svg";
import IconLogout from "../../assets/icons/profile/IconLogout.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthenticationStore } from "../../store/authentication";
import { notificationsFn } from "../../utils/notifications";
import NavLinks from "../links/NavLinks";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";

import { Avatar, Box, Stack, Title, Text } from "@mantine/core";

const profileLinksAttributes = [
  {
    label: "Edit Profile",
    icon: IconEditProfile,
    route: "/edit-profile",
    roles: ["EaseCompanion", "EaseBuddy", "super-admin"],
  },
  {
    label: "Change Password",
    icon: IconChangePassword,
    route: "/change-password",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Ease Companion Overview",
    icon: IconOverview,
    route: "/ease-companion-overview",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Anonymous & Notifications",
    icon: IconAnonymous,
    route: "/anonymous-notifications",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Terms And Conditions",
    icon: IconTerms,
    route: "/terms-and-conditions",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Privacy Policy",
    icon: IconPrivacy,
    route: "/privacy-policy",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "About Us",
    icon: IconAboutUs,
    route: "/about-us",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Logout",
    icon: IconLogout,
    action: "logout",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
];

export default function ProfileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { role, loggedInUser, logoutInternetIdentityFn } =
    useAuthenticationStore(
      useShallow((state) => ({
        role: state.user.data?.role,
        loggedInUser: state.user.data,
        logoutInternetIdentityFn: state.logoutInternetIdentity,
        message: state.message,
      }))
    );

  const [active, setActive] = useState();

  const currentLocation = () => {
    const navLinks = profileLinksAttributes.filter((item) =>
      location.pathname.startsWith(item.route)
    );

    const response = navLinks.length > 0 ? navLinks[0].label : null;
    setActive(response);
  };

  useEffect(() => {
    if (location) {
      currentLocation();
    }
  }, [location.pathname]);

  async function handleLogoutUser() {
    const id = notificationsFn.load();
    const response = await logoutInternetIdentityFn(loggedInUser.key);
    if (response) {
      notificationsFn.success(id, message);
      navigate("/internet-identity");
    } else {
      notificationsFn.error(id, message);
    }
  }

  function handleActive(link) {
    if (link.route) {
      navigate(link.route);
      setActive(link.label);
    } else {
      handleLogoutUser();
    }
  }

  const navLinks = profileLinksAttributes
    .filter(({ roles }) => roles.includes(role))
    .map((navLink) => {
      return (
        <NavLinks
          active={active}
          onSelect={() => handleActive(navLink)}
          label={navLink.label}
          key={navLink.label}
          icon={navLink.icon}
          type="profile"
          py={16}
          px={32}
        />
      );
    });
  return (
    loggedInUser && (
      <Stack gap={0}>
        <Box ta="center" py={24}>
          <Avatar
            display="inline-block"
            src={loggedInUser.profileImageUrl}
            radius="sm"
            w={100}
            h={100}
          />
          <Title order={4} ta="center">
            {loggedInUser.fullName}
          </Title>
          <Text size="sm" c="dimmed">
            {role}
          </Text>
        </Box>
        <Stack gap={0}>{navLinks}</Stack>
      </Stack>
    )
  );
}

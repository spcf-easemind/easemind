import IconEditProfile from "../../assets/icons/profile/IconEditProfile.svg";
import IconEditProfileDark from "../../assets/icons/profile/IconEditProfileDark.svg";
import IconChangePassword from "../../assets/icons/profile/IconChangePassword.svg";
import IconChangePasswordDark from "../../assets/icons/profile/IconChangePasswordDark.svg";
import IconOverview from "../../assets/icons/profile/IconOverview.svg";
import IconOverviewDark from "../../assets/icons/profile/IconOverviewDark.svg";
import IconAnonymous from "../../assets/icons/profile/IconAnonymous.svg";
import IconAnonymousDark from "../../assets/icons/profile/IconAnonymousDark.svg";
import IconTerms from "../../assets/icons/profile/IconTerms.svg";
import IconTermsDark from "../../assets/icons/profile/IconTermsDark.svg";
import IconPrivacy from "../../assets/icons/profile/IconPrivacy.svg";
import IconPrivacyDark from "../../assets/icons/profile/IconPrivacyDark.svg";
import IconAboutUs from "../../assets/icons/profile/IconAboutUs.svg";
import IconAboutUsDark from "../../assets/icons/profile/IconAboutUsDark.svg";
import IconLogout from "../../assets/icons/profile/IconLogout.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthenticationStore } from "../../store/authentication";
// import { notificationsFn } from "../../utils/notifications";
import NavLinks from "../links/NavLinks";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";

const profileLinksAttributes = [
  {
    label: "Edit Profile",
    icon: IconEditProfile,
    dark: IconEditProfileDark,
    route: "/edit-profile",
    roles: ["EaseCompanion", "EaseBuddy", "super-admin"],
  },
  {
    label: "Change Password",
    icon: IconChangePassword,
    dark: IconChangePasswordDark,
    route: "/change-password",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Ease Companion Overview",
    icon: IconOverview,
    dark: IconOverviewDark,
    route: "/ease-companion-overview",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Anonymous & Notifications",
    icon: IconAnonymous,
    dark: IconAnonymousDark,
    route: "/anonymous-notifications",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Terms And Conditions",
    icon: IconTerms,
    dark: IconTermsDark,
    route: "/terms-and-conditions",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Privacy Policy",
    icon: IconPrivacy,
    dark: IconPrivacyDark,
    route: "/privacy-policy",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "About Us",
    icon: IconAboutUs,
    dark: IconAboutUsDark,
    route: "/about-us",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  {
    label: "Logout",
    icon: IconLogout,
    dark: IconLogout,
    action: "logout",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
];

export default function ProfileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(colorScheme);
  const isDark = computedColorScheme === "dark" ? true : false;

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
    setColorScheme("light");
    const response = await logoutInternetIdentityFn(loggedInUser.key);
    if (response) {
      navigate("/internet-identity");
    } else {
      //
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
          icon={isDark ? navLink.dark : navLink.icon}
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

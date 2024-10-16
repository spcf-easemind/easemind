import {
  Group,
  Avatar,
  Title,
  Box,
  Text,
  Stack,
  NavLink,
  ScrollArea,
} from "@mantine/core";

import SampleUserImage from "../../assets/images/SampleUserImage1.webp";
import EndlessThoughtsDiaryIcon from "../../assets/icons/navigation/EndlessThoughtsDiary.svg";
import EaseCompanionIcon from "../../assets/icons/navigation/EaseCompanions.svg";
import CommunityGroupIcon from "../../assets/icons/navigation/CommunityGroups.svg";
import OwnedGroupsIcon from "../../assets/icons/navigation/OwnedGroups.svg";
import JoinedGroupsIcons from "../../assets/icons/navigation/JoinedGroups.svg";
import PendingApprovalIcon from "../../assets/icons/navigation/PendingApproval.svg";
import SavedIcon from "../../assets/icons/navigation/Saved.svg";
import PostsIcon from "../../assets/icons/navigation/Posts.svg";

import HomeNavLink from "../links/HomeNavLinks";
import UserProfileIndicator from "../UserProfileIndicator";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";

const sample_user = {
  name: "John Doe",
  role: "Ease Companion",
  image: SampleUserImage,
};

const navLinksAttributes = [
  {
    label: "Posts",
    icon: PostsIcon,
    route: "/posts",
    roles: ["EaseCompanion", "super-admin"],
  },
  {
    label: "Endless Thoughts Diary",
    icon: EndlessThoughtsDiaryIcon,
    route: "/endless-thoughts-diary",
    roles: ["user", "EaseCompanion", "super-admin"],
  },
  {
    label: "EaseCompanions",
    icon: EaseCompanionIcon,
    route: "/ease-companions",
    roles: ["user", "EaseCompanion", "super-admin"],
  },
  {
    label: "Community Groups",
    icon: CommunityGroupIcon,
    route: "/community-groups",
    roles: ["user", "EaseCompanion", "super-admin"],
  },
  {
    label: "Owned Groups",
    icon: OwnedGroupsIcon,
    route: "/owned-groups",
    roles: ["user", "EaseCompanion", "super-admin"],
  },
  {
    label: "Joined Groups",
    icon: JoinedGroupsIcons,
    route: "/joined-groups",
    roles: ["user", "EaseCompanion", "super-admin"],
  },
  {
    label: "Pending Approval",
    icon: PendingApprovalIcon,
    route: "/pending-approval",
    roles: ["user", "EaseCompanion", "super-admin"],
  },
  {
    label: "Saved",
    icon: SavedIcon,
    route: "/saved",
    roles: ["user", "EaseCompanion", "super-admin"],
  },
];

const profileIndicatorStyling = {
  padding: "lg",
  width: 65,
  height: 65,
};

export default function HomeNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, loggedInUser } = useAuthenticationStore(
    useShallow((state) => ({
      role: state.user.data?.role,
      loggedInUser: state.user.data,
    }))
  );

  const [active, setActive] = useState();

  const currentLocation = () => {
    const navLinks = navLinksAttributes.filter((item) =>
      location.pathname.startsWith(item.route)
    );

    const response = navLinks.length > 0 ? navLinks[0].label : null;
    setActive(response);
  };

  useEffect(() => {
    if (location) {
      currentLocation();
    }
  }, [location]);

  function handleActive(link) {
    navigate(link.route);
    setActive(link.label);
  }

  const navLinks = navLinksAttributes
    .filter(({ roles }) => roles.includes(role))
    .map((navLink) => {
      return (
        <HomeNavLink
          active={active}
          onSelect={() => handleActive(navLink)}
          key={navLink.label}
          {...navLink}
        />
      );
    });

  return (
    <>
      <Stack gap={0}>
        <UserProfileIndicator
          profile={loggedInUser?.image}
          name={loggedInUser?.fullName}
          role={role}
          {...profileIndicatorStyling}
        />
        <Stack gap={0}>{navLinks}</Stack>
      </Stack>
    </>
  );
}

import { Group, Avatar, Title, Box, Text, Stack, NavLink } from "@mantine/core";

import SampleUserImage from "../../assets/images/SampleUserImage1.webp";
import EndlessThoughtsDiaryIcon from "../../assets/icons/navigation/EndlessThoughtsDiary.svg";
import EaseCompanionIcon from "../../assets/icons/navigation/EaseCompanions.svg";
import CommunityGroupIcon from "../../assets/icons/navigation/CommunityGroups.svg";
import OwnedGroupsIcon from "../../assets/icons/navigation/OwnedGroups.svg";
import JoinedGroupsIcons from "../../assets/icons/navigation/JoinedGroups.svg";
import PendingApprovalIcon from "../../assets/icons/navigation/PendingApproval.svg";
import SavedIcon from "../../assets/icons/navigation/Saved.svg";

import HomeNavLink from "../links/HomeNavLinks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { set } from "date-fns";

const sample_user = {
  name: "John Doe",
  role: "Ease Companion",
  image: SampleUserImage,
};

const navLinksAttributes = [
  {
    label: "Endless Thoughts Diary",
    icon: EndlessThoughtsDiaryIcon,
    route: "/endless-thoughts-diary",
  },
  {
    label: "Ease Companions",
    icon: EaseCompanionIcon,
    route: "/ease-companions",
  },
  {
    label: "Community Groups",
    icon: CommunityGroupIcon,
    route: "/community-groups",
  },
  {
    label: "Owned Groups",
    icon: OwnedGroupsIcon,
    route: "/owned-groups",
  },
  {
    label: "Joined Groups",
    icon: JoinedGroupsIcons,
    route: "/joined-groups",
  },
  {
    label: "Pending Approval",
    icon: PendingApprovalIcon,
    route: "/pending-approval",
  },
  {
    label: "Saved",
    icon: SavedIcon,
    route: "/saved",
  },
];

export default function HomeNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const navLinks = navLinksAttributes.map((navLink) => {
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
        <Group p="lg">
          <Avatar src={sample_user.image} w={65} h={65} radius={10} />
          <Box>
            <Title order={4}>{sample_user.name}</Title>
            <Text c="gray" size="sm">
              {sample_user.role}
            </Text>
          </Box>
        </Group>
        <Stack gap={0}>{navLinks}</Stack>
      </Stack>
    </>
  );
}

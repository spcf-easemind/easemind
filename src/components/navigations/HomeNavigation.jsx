import { Group, Avatar, Title, Box, Text, Stack, NavLink } from "@mantine/core";

import SampleUserImage from "../../assets/images/SampleUserImage1.webp";
import EndlessThoughtsDiaryIcon from "../../assets/icons/navigation/EndlessThoughtsDiary.svg";
import EaseCompanionIcon from "../../assets/icons/navigation/EaseCompanions.svg";
import CommunityGroupIcon from "../../assets/icons/navigation/CommunityGroups.svg";
import OwnedGroupsIcon from "../../assets/icons/navigation/OwnedGroups.svg";
import JoinedGroupsIcons from "../../assets/icons/navigation/JoinedGroups.svg";
import PendingApprovalIcon from "../../assets/icons/navigation/PendingApproval.svg";
import SavedIcon from "../../assets/icons/navigation/Saved.svg";

import HomeNavLink from "../HomeNavLinks";

const sample_user = {
  name: "John Doe",
  role: "Ease Companion",
  image: SampleUserImage,
};

const navLinksAttributes = [
  {
    label: "Endless Thoughts Diary",
    icon: EndlessThoughtsDiaryIcon,
  },
  {
    label: "Ease Companions",
    icon: EaseCompanionIcon,
  },
  {
    label: "Community Groups",
    icon: CommunityGroupIcon,
  },
  {
    label: "Owned Groups",
    icon: OwnedGroupsIcon,
  },
  {
    label: "Joined Groups",
    icon: JoinedGroupsIcons,
  },
  {
    label: "Pending Approval",
    icon: PendingApprovalIcon,
  },
  {
    label: "Saved",
    icon: SavedIcon,
  },
];

export default function HomeNavigation() {
  const navLinks = navLinksAttributes.map((navLink) => {
    return <HomeNavLink key={navLink.label} {...navLink} />;
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
        <Stack gap={8}>{navLinks}</Stack>
      </Stack>
    </>
  );
}

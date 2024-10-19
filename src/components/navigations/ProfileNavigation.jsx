import IconEditProfile from "../../assets/icons/profile/IconEditProfile.svg";
import IconChangePassword from "../../assets/icons/profile/IconChangePassword.svg";
import IconOverview from "../../assets/icons/profile/IconOverview.svg";
import IconAnonymous from "../../assets/icons/profile/IconAnonymous.svg";
import IconTerms from "../../assets/icons/profile/IconTerms.svg";
import IconPrivacy from "../../assets/icons/profile/IconPrivacy.svg";
import { Stack } from "@mantine/core";

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
    icon: IconPrivacy,
    route: "/about-us",
    roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  },
  // {
  //   label: "Saved",
  //   icon: SavedIcon,
  //   route: "/saved",
  //   roles: ["EaseBuddy", "EaseCompanion", "super-admin"],
  // },
];

export default function ProfileNavigation() {
  return <Stack></Stack>;
}

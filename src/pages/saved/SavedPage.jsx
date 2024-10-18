import { Box, Card } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import { POSTS } from "../../static/home";
import SampleUserImage1 from "../../assets/images/SampleUserImage1.webp";

import HeadingCard from "../../components/headings/HeadingCard";
import PostSection from "../../components/posts/PostSection";
import PostModal from "../../components/modals/PostModal";

import IconUnsave from "../../assets/icons/buttons/IconSave.svg";
import IconReport from "../../assets/icons/header/IconInfo.svg";

const headingCardAttributes = {
  title: "Saved",
  description:
    "Your saved posts are here! Scroll through and revisit the insights that matter most to you.",
};

// Static data
const sample_post = {
  id: 1,
  userProfileImage: SampleUserImage1,
  userName: "Chubby Bunny",
  userRole: "Ease Companion",
  postTitle:
    "Remember your well-being matters. Take to meditate, love yourself, and prioritize your mental health",
  postContent:
    "Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health. Remember, your well-being matters. Take time to meditate, love yourself, and prioritize your mental health.",
  tags: ["Anxiety", "Depression"],
  hashtags: ["keepItPositive", "anxiety"],
};

const postOptionsAttributes = [
  {
    icon: IconUnsave,
    label: "Unsave",
    value: "unsave",
  },
  {
    icon: IconReport,
    label: "Report",
    value: "report",
  },
];

const profileIndicatorStyling = {
  padding: "",
  width: 55,
  height: 55,
};

export default function SavedPage() {
  const [opened, { open, close }] = useDisclosure(false);

  const savedPosts = POSTS.map((post) => {
    return (
      <Card withBorder radius={10} my={20} p={25}>
        <PostSection
          {...post}
          key={post.id}
          onOpen={open}
          options={postOptionsAttributes}
          profileIndicatorStyling={profileIndicatorStyling}
        />
      </Card>
    );
  });
  return (
    <Box p={5}>
      <HeadingCard {...headingCardAttributes} />
      {savedPosts}
      <PostModal
        openModal={opened}
        closeModal={close}
        sample={sample_post}
        options={postOptionsAttributes}
        profileIndicatorStyling={profileIndicatorStyling}
        {...sample_post}
      />
    </Box>
  );
}

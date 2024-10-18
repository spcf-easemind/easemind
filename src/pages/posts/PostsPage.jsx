import { Box, Paper, Stack } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import DisplayCard from "../../components/cards/DisplayCard";
import CreateButtonCard from "../../components/buttons/CreateButtonCard";
import PostCard from "../../components/cards/PostCard";
import { useNavigate } from "react-router-dom";

const header = {
  title: "Posts",
  description: null,
};

const userData = {
  name: "Gabriel Gatbonton",
  role: "Ease Companion",
  pronouns: "He/Him",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quae a labore eligendi beatae ex sit esse, quia necessitatibus eius.",
  categories: [
    {
      key: "-38hWqfQzWvD4bNNabkHj",
      data: {
        name: "Self-Doubt",
      },
    },
    {
      key: "knsiR3xOwL2-zzfrUd0R-",
      data: {
        name: "Self-Sabotage",
      },
    },
    {
      key: "xc3SGIFUdTqBbiAhYu7O-",
      data: {
        name: "Insecurity",
      },
    },
  ],
  joinedGroups: [
    {
      key: "1",
      data: {
        name: "Group 1",
        membersCount: 3,
        groupImageUrl: "https://via.placeholder.com/150",
      },
    },
    {
      key: "2",
      data: {
        name: "Group 2",
        membersCount: 3,
        groupImageUrl: "https://via.placeholder.com/150",
      },
    },
  ],
  availability: [
    {
      day: "Monday",
      time: "5:00 PM - 8:00 PM",
    },
    {
      day: "Tuesday",
      time: "5:00 PM - 8:00 PM",
    },
    {
      day: "Wednesday",
      time: "5:00 PM - 8:00 PM",
    },
    {
      day: "Thursday",
      time: "5:00 PM - 8:00 PM",
    },
    {
      day: "Friday",
      time: "5:00 PM - 8:00 PM",
    },
    {
      day: "Saturday",
      time: "5:00 PM - 8:00 PM",
    },
    {
      day: "Sunday",
      time: "Not Available",
    },
  ],
};

export default function PostsPage() {
  const navigate = useNavigate();

  function handleCreatePost() {
    navigate("/posts/create");
  }

  function handlePopoverUserSelect(option, userRef) {
    if (option === "edit") {
      navigate(`/profile`);
    }
  }

  function handlePopoverSelect(option, postRef) {
    if (option === "edit") {
      navigate(`/post/edit/${postRef}`);
    } else if (option === "delete") {
      console.log("Delete post"); // Action
    }
  }
  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />

      <Box mt={18}>
        <CreateButtonCard onClick={handleCreatePost}>
          Create Posts
        </CreateButtonCard>
      </Box>

      <Box mt={18}>
        <DisplayCard
          onButtonClick={handlePopoverUserSelect}
          instance={userData}
          type="posts"
          variant="view"
        />
      </Box>

      <Stack mt={18}>
        <PostCard onPopoverSelect={handlePopoverSelect} />
      </Stack>
    </Paper>
  );
}

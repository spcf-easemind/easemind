import { Box, Paper, Stack } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import DisplayCard from "../../components/cards/groups/DisplayCard";
import CreateButtonCard from "../../components/buttons/CreateButtonCard";
import PostCard from "../../components/cards/posts/PostCard";
import { useNavigate } from "react-router-dom";
import WarningModal from "../../components/modals/WarningModal";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { toggle }] = useDisclosure();

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
      toggle();
    }
  }

  function handleModalConfirmation() {
    toggle();
  }

  const message = `Are you sure you want to remove this post? Once removed, all associated data will no longer be accessible.`;

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
          button={{
            buttonLabel: null,
            loading: false,
          }}
        />
      </Box>

      <Stack mt={18}>
        <PostCard type="posts" onPopoverSelect={handlePopoverSelect} />
      </Stack>

      <WarningModal
        form={{
          onClick: handleModalConfirmation,
          loading: false,
          message,
          title: "Remove Post?",
          btnType: "Remove",
        }}
        modal={{ opened: opened, onClose: toggle }}
      />
    </Paper>
  );
}

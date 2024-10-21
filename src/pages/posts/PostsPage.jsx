import { Box, Paper, Stack, Button } from "@mantine/core";
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
    "Your mental health matters. Take time to care for your mind and soul—rest, reflect, and seek support when needed. Remember, it's okay not to be okay, and every step towards healing is progress. You are stronger than you know!",
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
  availability: {
    monday: {
      startTime: "14:00",
      endTime: "17:00",
    },
    tuesday: {
      startTime: "",
      endTime: "",
    },
    wednesday: {
      startTime: "14:00",
      endTime: "17:00",
    },
    thursday: {
      startTime: "",
      endTime: "",
    },
    friday: {
      startTime: "14:00",
      endTime: "17:00",
    },
    saturday: {
      startTime: "",
      endTime: "",
    },
    sunday: {
      startTime: "",
      endTime: "",
    },
  },
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
        form={{ message, title: "Remove Post?" }}
        modal={{ opened: opened, onClose: toggle }}
      >
        <Button onClick={toggle} variant="light">
          Cancel
        </Button>
        <Button onClick={handleModalConfirmation} loading={false}>
          Remove
        </Button>
      </WarningModal>
    </Paper>
  );
}

import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard.jsx";
import GroupGrid from "../../components/grid/GroupGrid.jsx";
import { useNavigate } from "react-router-dom";

const header = {
  title: "Ease Companions",
  description: null,
};

const groupData = [
  {
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
  },
];

export default function EaseCompanionsPage() {
  const navigate = useNavigate();
  function handleSelect() {
    navigate("/ease-companion/1");
  }

  function handleConnect() {
    console.log("Connect with companion");
  }

  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />

      <Box mt={18}>
        <GroupGrid
          groupData={groupData}
          type="companion"
          onSelect={handleSelect}
          onButtonClick={handleConnect}
        />
      </Box>
    </Paper>
  );
}

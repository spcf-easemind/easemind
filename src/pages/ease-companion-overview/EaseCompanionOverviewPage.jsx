import DisplayCard from "../../components/cards/groups/DisplayCard";
import { Box } from "@mantine/core";

const groupData = {
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

export default function EaseCompanionOverviewPage() {
  return (
    <Box maw={800} mx="auto">
      <DisplayCard
        instance={groupData}
        variant="view"
        type="overview"
        button={{ buttonLabel: null, loading: false }}
      />
    </Box>
  );
}

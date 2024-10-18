import { Paper } from "@mantine/core";
import DisplayCard from "../../components/cards/DisplayCard";

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

export default function EaseCompanionViewPage() {
  return (
    <Paper>
      <DisplayCard
        instance={groupData}
        variant="view"
        type="companion"
        buttonLabel="Connect"
      />
    </Paper>
  );
}

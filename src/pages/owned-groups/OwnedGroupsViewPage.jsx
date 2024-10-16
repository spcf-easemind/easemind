import { Paper } from "@mantine/core";
import DisplayCard from "../../components/cards/DisplayCard";
export default function OwnedGroupsViewPage() {
  return (
    <Paper p={18}>
      <DisplayCard buttonLabel="Edit" variant="view" />
    </Paper>
  );
}

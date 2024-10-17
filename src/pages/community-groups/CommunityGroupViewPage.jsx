import DisplayCard from "../../components/cards/DisplayCard";
import { Paper } from "@mantine/core";

export default function CommunityGroupViewPage() {
  return (
    <Paper>
      <DisplayCard variant="view" buttonLabel="Join" type="community" />
    </Paper>
  );
}

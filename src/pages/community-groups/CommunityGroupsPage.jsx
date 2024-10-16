import { Paper, Grid, Box } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import DisplayCard from "../../components/cards/DisplayCard";
import GroupGrid from "../../components/grid/GroupGrid";
import { useNavigate } from "react-router-dom";
export default function CommunityGroupsPage() {
  const navigate = useNavigate();
  function handleSelect(ref) {
    navigate(`/community-groups/${ref}`);
  }

  return (
    <Paper p={18}>
      <HeadingCard
        title="Community Groups"
        description="Discover community groups that match your interests and needs. Engage with others, share experiences, and build meaningful connections to become the best version of yourself."
      />

      <Box mt={18}>
        <GroupGrid type="community" onSelect={handleSelect} />
      </Box>
    </Paper>
  );
}

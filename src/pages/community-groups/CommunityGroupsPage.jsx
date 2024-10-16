import { Paper, Grid } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import DisplayCard from "../../components/cards/DisplayCard";
export default function CommunityGroupsPage() {
  return (
    <Paper p={18}>
      <HeadingCard
        title="Community Groups"
        description="Discover community groups that match your interests and needs. Engage with others, share experiences, and build meaningful connections to become the best version of yourself."
      />

      <Grid mt={18}>
        <Grid.Col span={6}>
          <DisplayCard />
        </Grid.Col>
        <Grid.Col span={6}>
          <DisplayCard />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

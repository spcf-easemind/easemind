import { Grid } from "@mantine/core";
import DisplayCard from "../cards/DisplayCard";

export default function GroupGrid({ type, onSelect, onButtonClick }) {
  const btnLabel = () => {
    if (type === "community") {
      return "Join";
    } else if (type === "owned") {
      return "Edit";
    } else if (type === "joined") {
      return "View Chat";
    }
  };
  return (
    <Grid>
      <Grid.Col span={6}>
        <DisplayCard
          onButtonClick={onButtonClick}
          onSelect={onSelect}
          buttonLabel={btnLabel()}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <DisplayCard
          onButtonClick={onButtonClick}
          onSelect={onSelect}
          buttonLabel={btnLabel()}
        />
      </Grid.Col>
    </Grid>
  );
}

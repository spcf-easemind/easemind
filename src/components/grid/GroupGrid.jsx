import { Grid } from "@mantine/core";
import DisplayCard from "../cards/DisplayCard";

export default function GroupGrid({
  groupData,
  type,
  onSelect,
  onButtonClick,
}) {
  const btnLabel = () => {
    if (type === "community") {
      return "Join";
    } else if (type === "owned") {
      return "Edit";
    } else if (type === "joined") {
      return "View Chat";
    }
  };

  const ColInstances = groupData.map((group) => {
    return (
      <Grid.Col span={6} key={group.key}>
        <DisplayCard
          instance={group}
          type={type}
          onButtonClick={onButtonClick}
          onSelect={onSelect}
          buttonLabel={btnLabel()}
        />
      </Grid.Col>
    );
  });
  return <Grid>{ColInstances}</Grid>;
}

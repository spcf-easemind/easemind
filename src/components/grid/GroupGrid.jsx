import { Grid, SimpleGrid } from "@mantine/core";
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
        <DisplayCard
          key={group.key}
          instance={group}
          type={type}
          onButtonClick={onButtonClick}
          onSelect={onSelect}
          buttonLabel={btnLabel()}
        />
    );
  });
  return <SimpleGrid cols={2}>{ColInstances}</SimpleGrid>;
}

import { Grid, SimpleGrid } from "@mantine/core";
import DisplayCard from "../cards/groups/DisplayCard";

export default function GroupGrid({
  groupData,
  type,
  onSelect,
  onButtonClick,
  loading,
}) {
  const btnLabel = () => {
    if (type === "community") {
      return "Join";
    } else if (type === "owned") {
      return "Edit";
    } else if (type === "joined") {
      return "View Chat";
    } else if (type === "companion") {
      return "Connect";
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
        button={{ buttonLabel: btnLabel(), loading: loading }}
      />
    );
  });
  return <SimpleGrid cols={{ xs: 1, xl: 2 }}>{ColInstances}</SimpleGrid>;
}

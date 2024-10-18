import { SimpleGrid } from "@mantine/core";
import PendingCard from "../cards/PendingCard";

export default function PendingGrid({ onClick }) {
  const label = "10 Pending";

  return (
    <SimpleGrid cols={2}>
      <PendingCard image={null} button={{ label, onClick: onClick }} />

      <PendingCard image={null} button={{ label, onClick: onClick }} />
    </SimpleGrid>
  );
}

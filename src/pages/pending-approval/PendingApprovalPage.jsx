import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import PendingGrid from "../../components/grid/PendingGrid";
import { useNavigate } from "react-router-dom";

const header = {
  title: "Pending Approval",
  description: null,
};

export default function PendingApprovalPage() {
  const navigate = useNavigate();
  function handlePendingClick() {
    console.log("Pending Clicked");
    navigate("/pending-approval/1");
  }

  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />
      <Box mt={18}>
        <PendingGrid onClick={handlePendingClick} />
      </Box>
    </Paper>
  );
}

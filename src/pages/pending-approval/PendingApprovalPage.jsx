import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard";
import PendingGrid from "../../components/grid/PendingGrid";
import { useNavigate } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

const header = {
  title: "Pending Approval",
  description: null,
};

export default function PendingApprovalPage() {
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const { fetchPendingApprovalsFn, pendingApprovals } = useGroupAPIStore(
    useShallow((state) => ({
      fetchPendingApprovalsFn: state.fetchPendingApprovals,
      pendingApprovals: state.pendingApprovals,
    }))
  );

  useEffect(() => {
    fetchPendingApprovalsFn(loggedInUserKey);
  }, []);

  const navigate = useNavigate();

  function handlePendingClick(ref) {
    navigate(`/pending-approval/${ref}`);
  }

  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />
      <Box mt={18}>
        <PendingGrid
          pendingApprovals={pendingApprovals}
          onClick={handlePendingClick}
        />
      </Box>
    </Paper>
  );
}

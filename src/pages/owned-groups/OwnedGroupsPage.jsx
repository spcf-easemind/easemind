import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard.jsx";
import CreateGroupButton from "../../components/buttons/CreateGroupButton.jsx";
import GroupGrid from "../../components/grid/GroupGrid.jsx";
import { useNavigate } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api.js";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { useAuthenticationStore } from "../../store/authentication.js";

export default function OwnedGroupsPage() {
  const navigate = useNavigate();
  const loggedInUserId = useAuthenticationStore(
    (state) => state.user.data?.key
  );
  const { ownedGroups, fetchOwnedGroupsFn } = useGroupAPIStore(
    useShallow((state) => ({
      ownedGroups: state.ownedGroups,
      fetchOwnedGroupsFn: state.fetchOwnedGroups,
    }))
  );

  useEffect(() => {
    fetchOwnedGroupsFn(loggedInUserId);
  }, []);

  function handleSelect(ref) {
    navigate(`/owned-groups/${ref}`);
  }

  function handleCreateGroup() {
    navigate("/owned-group/create");
  }

  function handleEditGroup() {
    navigate(`/owned-group/edit/1`);
  }

  return (
    <Paper>
      <HeadingCard title="Owned Groups" description={null} />

      <Box mt={18}>
        <CreateGroupButton onClick={handleCreateGroup} />
      </Box>

      <Box mt={18}>
        <GroupGrid
          groupData={ownedGroups}
          onButtonClick={handleEditGroup}
          onSelect={handleSelect}
          type="owned"
        />
      </Box>
    </Paper>
  );
}

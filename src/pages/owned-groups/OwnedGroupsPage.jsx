import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard.jsx";
import CreateGroupButton from "../../components/buttons/CreateGroupButton.jsx";
import GroupGrid from "../../components/grid/GroupGrid.jsx";
import { useNavigate } from "react-router-dom";

export default function OwnedGroupsPage() {
  const navigate = useNavigate();

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
          onButtonClick={handleEditGroup}
          onSelect={handleSelect}
          type="owned"
        />
      </Box>
    </Paper>
  );
}

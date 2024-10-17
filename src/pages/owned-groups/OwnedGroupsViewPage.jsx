import { Group, Paper } from "@mantine/core";
import DisplayCard from "../../components/cards/DisplayCard";
import GroupModal from "../../components/modals/GroupModal";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
export default function OwnedGroupsViewPage() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();

  function handleModalSelect(value) {
    console.log(value);
    toggle();
  }

  function handleModalClick() {
    console.log("Modal clicked");
    toggle();
  }

  function handleEditGroup() {
    navigate(`/owned-group/edit/1`);
  }

  const loading = false;

  return (
    <Paper>
      <DisplayCard
        buttonLabel="Edit"
        variant="view"
        type="owned"
        onModalSelect={handleModalSelect}
        onButtonClick={handleEditGroup}
      />
      <GroupModal
        modal={{ opened: opened, onClose: toggle }}
        form={{ onClick: handleModalClick, loading: loading }}
      />
    </Paper>
  );
}

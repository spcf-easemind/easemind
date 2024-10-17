import { Group, Paper } from "@mantine/core";
import DisplayCard from "../../components/cards/DisplayCard";
import GroupModal from "../../components/modals/GroupModal";
import { useDisclosure } from "@mantine/hooks";
export default function OwnedGroupsViewPage() {
  const [opened, { toggle }] = useDisclosure();

  function handleModalSelect(value) {
    console.log(value);
    toggle();
  }

  function handleModalClick() {
    console.log("Modal clicked");
    toggle();
  }

  const loading = false;

  return (
    <Paper>
      <DisplayCard
        buttonLabel="Edit"
        variant="view"
        type="owned"
        onModalSelect={handleModalSelect}
      />
      <GroupModal
        modal={{ opened: opened, onClose: toggle }}
        form={{ onClick: handleModalClick, loading: loading }}
      />
    </Paper>
  );
}

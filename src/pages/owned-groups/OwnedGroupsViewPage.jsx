import { Paper } from "@mantine/core";
import DisplayCard from "../../components/cards/DisplayCard";
import GroupModal from "../../components/modals/GroupModal";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";

export default function OwnedGroupsViewPage() {
  const navigate = useNavigate();
  const { ownedGroupRef } = useParams();
  const [modalTarget, setModalTarget] = useState(null);

  // Zustand
  const { fetchOwnedGroupFn, ownedGroup } = useGroupAPIStore(
    useShallow((state) => ({
      ownedGroup: state.ownedGroup,
      fetchOwnedGroupFn: state.fetchOwnedGroup,
    }))
  );

  useEffect(() => {
    fetchOwnedGroupFn(ownedGroupRef);
  }, []);

  const [opened, { toggle }] = useDisclosure();

  function handleModalSelect(member) {
    console.log(member);
    setModalTarget(member.fullName);
    toggle();
  }

  function handleModalClick() {
    // Trigger the Confirmation Delete Fn
    toggle();
  }

  function handleEditGroup() {
    navigate(`/owned-group/edit/${ownedGroupRef}`);
  }

  const loading = false;

  return (
    ownedGroup && (
      <Paper>
        <DisplayCard
          instance={ownedGroup}
          buttonLabel="Edit"
          variant="view"
          type="owned"
          onModalSelect={handleModalSelect}
          onButtonClick={handleEditGroup}
        />
        <GroupModal
          name={modalTarget}
          modal={{ opened: opened, onClose: toggle }}
          form={{ onClick: handleModalClick, loading: loading }}
        />
      </Paper>
    )
  );
}

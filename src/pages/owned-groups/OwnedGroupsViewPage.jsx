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
  const { fetchOwnedGroupFn, ownedGroup, removeGroupMemberFn, groupLoading } =
    useGroupAPIStore(
      useShallow((state) => ({
        ownedGroup: state.ownedGroup,
        fetchOwnedGroupFn: state.fetchOwnedGroup,
        removeGroupMemberFn: state.removeGroupMember,
        groupLoading: state.loading,
      }))
    );

  useEffect(() => {
    fetchOwnedGroupFn(ownedGroupRef);
  }, []);

  const [opened, { toggle }] = useDisclosure();

  function handleModalSelect(member) {
    setModalTarget(member);
    toggle();
  }

  async function handleModalClick() {
    await removeGroupMemberFn(ownedGroupRef, modalTarget.key);
    toggle();
  }

  function handleEditGroup() {
    navigate(`/owned-group/edit/${ownedGroupRef}`);
  }

  const modalTargetName = modalTarget ? modalTarget.fullName : "";

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
          target={modalTargetName}
          modal={{ opened: opened, onClose: toggle }}
          form={{ onClick: handleModalClick, loading: groupLoading }}
        />
      </Paper>
    )
  );
}

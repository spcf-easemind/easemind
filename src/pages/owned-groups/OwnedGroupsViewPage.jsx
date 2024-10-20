import { Paper, Button } from "@mantine/core";
import DisplayCard from "../../components/cards/groups/DisplayCard";
import WarningModal from "../../components/modals/WarningModal";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { useAuthenticationStore } from "../../store/authentication";
import { notificationsFn } from "../../utils/notifications";

export default function OwnedGroupsViewPage() {
  const navigate = useNavigate();
  const { ownedGroupRef } = useParams();
  const [modalTarget, setModalTarget] = useState(null);

  // Zustand
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );
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
    fetchOwnedGroupFn(loggedInUserKey, ownedGroupRef);
  }, []);

  const [opened, { toggle }] = useDisclosure();

  function handleModalSelect(member) {
    setModalTarget(member);
    toggle();
  }

  async function handleModalClick() {
    const response = await removeGroupMemberFn(
      loggedInUserKey,
      ownedGroupRef,
      modalTarget.key
    );

    toggle();

    const id = notificationsFn.load();
    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      fetchOwnedGroupFn(loggedInUserKey, ownedGroupRef);
    } else {
      notificationsFn.error(id, response.message);
    }
  }

  function handleEditGroup() {
    navigate(`/owned-group/edit/${ownedGroupRef}`);
  }

  const modalTargetName = modalTarget ? modalTarget.fullName : "";

  const title = `Remove from group?`;
  const message = `Are you sure you want to remove ${modalTargetName} from the group? Once removed, all associated data will no longer be accessible unless they rejoin.`;

  return (
    ownedGroup && (
      <Paper>
        <DisplayCard
          instance={ownedGroup.groupInfo}
          button={{ buttonLabel: "Edit", loading: false }}
          variant="view"
          type="owned"
          onModalSelect={handleModalSelect}
          onButtonClick={handleEditGroup}
        />
        <WarningModal
          modal={{ opened: opened, onClose: toggle }}
          form={{ message, title }}
        >
          <Button onClick={toggle} variant="light">
            Cancel
          </Button>
          <Button onClick={handleModalClick} loading={groupLoading}>
            Remove
          </Button>
        </WarningModal>
      </Paper>
    )
  );
}

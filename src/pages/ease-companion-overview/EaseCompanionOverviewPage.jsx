import { useDisclosure } from "@mantine/hooks";
import DisplayCard from "../../components/cards/groups/DisplayCard";
import { Box } from "@mantine/core";
import UserModal from "../../components/modals/UserModal";
import { useProfileAPIStore } from "../../store/profile-api";
import { useAuthenticationStore } from "../../store/authentication";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { notificationsFn } from "../../utils/notifications";

export default function EaseCompanionOverviewPage() {
  const [opened, { toggle }] = useDisclosure();

  const loggedInUser = useAuthenticationStore((state) => state.user.data);

  const {
    fetchEaseCompanionOverviewFn,
    easeCompanionOverview,
    updateEaseCompanionOverviewFn,
  } = useProfileAPIStore(
    useShallow((state) => ({
      fetchEaseCompanionOverviewFn: state.fetchEaseCompanionOverview,
      easeCompanionOverview: state.easeCompanionOverview,
      updateEaseCompanionOverviewFn: state.updateEaseCompanionOverview,
    }))
  );

  useEffect(() => {
    fetchEaseCompanionOverviewFn(loggedInUser.key);
  }, []);

  console.log(easeCompanionOverview);

  const userData = useMemo(() => {
    if (easeCompanionOverview) {
      const preparedData = {
        name: loggedInUser.fullName,
        role: loggedInUser.role,
        pronouns: loggedInUser?.pronouns,
        title:
          easeCompanionOverview.title === ""
            ? "Please write your title"
            : easeCompanionOverview.title,
        description:
          easeCompanionOverview.description === ""
            ? "Please write your description"
            : easeCompanionOverview.description,
        categories: easeCompanionOverview.categories,
        availability: easeCompanionOverview.availability,
      };
      return preparedData;
    }
  }, [easeCompanionOverview, loggedInUser]);

  function handlePopoverClick(choice, key) {
    if (choice === "edit") {
      toggle();
    }
  }

  async function handleFormSubmit(formData) {
    const finalData = { ...formData, userKey: loggedInUser.key };

    const id = notificationsFn.load();
    const response = await updateEaseCompanionOverviewFn(finalData);

    if (response.type === "success") {
      toggle();
      notificationsFn.success(id, response.message);
      fetchEaseCompanionOverviewFn(loggedInUser.key);
    } else {
      notificationsFn.error(id, response.message);
    }
  }

  return (
    easeCompanionOverview && (
      <>
        <Box maw={800} mx="auto">
          <DisplayCard
            instance={userData}
            variant="view"
            type="overview"
            button={{ buttonLabel: null, loading: false }}
            onButtonClick={handlePopoverClick}
            bg="gray.0"
          />
        </Box>
        <UserModal
          instance={userData}
          modal={{ opened, onClose: toggle }}
          onFormSubmit={handleFormSubmit}
        />
      </>
    )
  );
}

import { Paper } from "@mantine/core";
import DisplayCard from "../../components/cards/groups/DisplayCard";
import { useUsersAPIStore } from "../../store/users-api";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function EaseCompanionViewPage() {
  const { companionRef } = useParams();
  const { userCompanion, fetchUserCompanionFn } = useUsersAPIStore(
    useShallow((state) => ({
      userCompanion: state.userCompanion,
      fetchUserCompanionFn: state.fetchUserCompanion,
    }))
  );

  useEffect(() => {
    fetchUserCompanionFn(companionRef);
  }, []);

  // console.log(userCompanion);

  const computedUserData = useMemo(() => {
    if (userCompanion) {
      const { user, userCompanionOverview, userGroup } = userCompanion;
      return {
        key: user.key,
        name: user.fullName,
        role: user.role,
        groupImageUrl: user.profileImageUrl,
        pronouns: user.pronouns,
        description: userCompanionOverview.description,
        categories: userCompanionOverview.categories,
        availability: userCompanionOverview.availability,
        joinedGroups: userGroup,
      };
    }
  }, [userCompanion]);

  function handleConnect() {
    console.log("Connect with companion");
  }

  return (
    userCompanion && (
      <Paper>
        <DisplayCard
          instance={computedUserData}
          variant="view"
          type="companion"
          button={{ buttonLabel: "Connect", loading: false }}
        />
      </Paper>
    )
  );
}

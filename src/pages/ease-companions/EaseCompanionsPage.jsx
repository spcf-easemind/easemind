import { Box, Paper } from "@mantine/core";
import HeadingCard from "../../components/headings/HeadingCard.jsx";
import GroupGrid from "../../components/grid/GroupGrid.jsx";
import { useNavigate } from "react-router-dom";
import { useUsersAPIStore } from "../../store/users-api.js";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";

const header = {
  title: "Ease Companions",
  description: null,
};
export default function EaseCompanionsPage() {
  const navigate = useNavigate();

  const { fetchUserCompanionsFn, userCompanions } = useUsersAPIStore(
    useShallow((state) => ({
      fetchUserCompanionsFn: state.fetchUserCompanions,
      userCompanions: state.userCompanions,
    }))
  );

  useEffect(() => {
    fetchUserCompanionsFn();
  }, []);

  const computedUserCompanions = useMemo(() => {
    return userCompanions.map(({ user, userCompanionOverview }) => {
      return {
        key: user.key,
        name: user.fullName,
        role: user.role,
        groupImageUrl: user.profileImageUrl,
        pronouns: user.pronouns,
        description: userCompanionOverview.description,
        categories: userCompanionOverview.categories,
      };
    });
  }, [userCompanions]);

  function handleSelect(ref) {
    navigate(`/ease-companion/${ref}`);
  }

  function handleConnect() {
    console.log("Connect with companion");
  }

  return (
    <Paper>
      <HeadingCard title={header.title} description={header.description} />

      <Box mt={18}>
        <GroupGrid
          groupData={computedUserCompanions}
          type="companion"
          onSelect={handleSelect}
          onButtonClick={handleConnect}
        />
      </Box>
    </Paper>
  );
}

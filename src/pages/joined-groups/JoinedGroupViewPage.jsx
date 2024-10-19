import { Paper } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import DisplayCard from "../../components/cards/DisplayCard";
import { useGroupAPIStore } from "../../store/group-api";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";

export default function JoinedGroupViewPage() {
  const { joinedGroupRef } = useParams();
  // const navigate = useNavigate();

  const { fetchJoinedGroupFn, joinedGroup } = useGroupAPIStore(
    useShallow((state) => ({
      fetchJoinedGroupFn: state.fetchJoinedGroup,
      joinedGroup: state.joinedGroup,
    }))
  );

  useEffect(() => {
    console.log(joinedGroupRef);
    fetchJoinedGroupFn(joinedGroupRef);
  }, []);

  function handleButtonClick() {
    console.log("View Chat");
  }

  return (
    joinedGroup && (
      <Paper>
        <DisplayCard
          instance={joinedGroup}
          variant="view"
          type="joined"
          button={{ buttonLabel: "View Chat", loading: false }}
          onButtonClick={handleButtonClick}
        />
      </Paper>
    )
  );
}

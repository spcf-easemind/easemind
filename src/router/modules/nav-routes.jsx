import CommunityGroupsPage from "../../pages/community-groups/CommunityGroupsPage";
import CommunityGroupViewPage from "../../pages/community-groups/CommunityGroupViewPage";

const navRoutes = [
  {
    path: "/community-groups",
    element: <CommunityGroupsPage />,
  },
  {
    path: "/community-groups/:communityGroupRef",
    element: <CommunityGroupViewPage />,
  },
];

export default navRoutes;

import EndlessThoughtsDiaryPage from "../../pages/endless-thoughts-diary/EndlessThoughtsDiaryPage";
import EaseCompanionsPage from "../../pages/ease-companions/EaseCompanionsPage";
import CommunityGroupsPage from "../../pages/community-groups/CommunityGroupsPage";
import CommunityGroupViewPage from "../../pages/community-groups/CommunityGroupViewPage";
import OwnedGroupsPage from "../../pages/owned-groups/OwnedGroupsPage";
import JoinedGroupsPage from "../../pages/joined-groups/JoinedGroupsPage";
import PendingApprovalPage from "../../pages/pending-approval/PendingApprovalPage";
import SavedPage from "../../pages/saved/SavedPage";

const navRoutes = [
  {
    path: "/endless-thoughts-diary",
    element: <EndlessThoughtsDiaryPage />,
  },
  {
    path: "/ease-companions",
    element: <EaseCompanionsPage />,
  },
  {
    path: "/community-groups",
    element: <CommunityGroupsPage />,
  },
  {
    path: "/community-groups/:communityGroupRef",
    element: <CommunityGroupViewPage />,
  },
  {
    path: "/owned-groups",
    element: <OwnedGroupsPage />,
  },
  {
    path: "/joined-groups",
    element: <JoinedGroupsPage />,
  },
  {
    path: "/pending-approval",
    element: <PendingApprovalPage />,
  },
  {
    path: "/saved",
    element: <SavedPage />,
  },
];

export default navRoutes;

// DIary
import EndlessThoughtsDiaryPage from "../../pages/endless-thoughts-diary/EndlessThoughtsDiaryPage";

// Ease Companions
import EaseCompanionsPage from "../../pages/ease-companions/EaseCompanionsPage";

// Community Groups
import CommunityGroupsPage from "../../pages/community-groups/CommunityGroupsPage";
import CommunityGroupViewPage from "../../pages/community-groups/CommunityGroupViewPage";

// Owned Groups
import OwnedGroupsPage from "../../pages/owned-groups/OwnedGroupsPage";
import OwnedGroupsViewPage from "../../pages/owned-groups/OwnedGroupsViewPage";
import CreateGroupPage from "../../pages/owned-groups/CreateGroupPage";
import EditGroupPage from "../../pages/owned-groups/EditGroupPage";

// Joined Groups
import JoinedGroupsPage from "../../pages/joined-groups/JoinedGroupsPage";

// Pending Approval
import PendingApprovalPage from "../../pages/pending-approval/PendingApprovalPage";

// Saved
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

  // Community Groups
  {
    path: "/community-groups",
    element: <CommunityGroupsPage />,
  },
  {
    path: "/community-groups/:communityGroupRef",
    element: <CommunityGroupViewPage />,
  },

  // Owned Groups
  {
    path: "/owned-groups",
    element: <OwnedGroupsPage />,
  },
  {
    path: "/owned-groups/:ownedGroupRef",
    element: <OwnedGroupsViewPage />,
  },
  {
    path: "/owned-group/create",
    element: <CreateGroupPage />,
  },
  {
    path: "/owned-group/edit/:ownedGroupRef",
    element: <EditGroupPage />,
  },

  // Joined Groups
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

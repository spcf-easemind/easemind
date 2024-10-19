// DIary
import EndlessThoughtsDiaryPage from "../../pages/endless-thoughts-diary/EndlessThoughtsDiaryPage";

// Posts
import PostsPage from "../../pages/posts/PostsPage";
import CreatePostPage from "../../pages/posts/CreatePostPage";
import EditPostPage from "../../pages/posts/EditPostPage";

// Ease Companions
import EaseCompanionsPage from "../../pages/ease-companions/EaseCompanionsPage";
import EaseCompanionViewPage from "../../pages/ease-companions/EaseCompanionViewPage";

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
import JoinedGroupViewPage from "../../pages/joined-groups/JoinedGroupViewPage";

// Photo Control for Groups
import PhotoControlPage from "../../pages/PhotoControlPage";

// Pending Approval
import PendingApprovalPage from "../../pages/pending-approval/PendingApprovalPage";
import PendingApprovalPageView from "../../pages/pending-approval/PendingApprovalViewPage";

// Saved
import SavedPage from "../../pages/saved/SavedPage";

const navRoutes = [
  // Posts
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/posts/create",
    element: <CreatePostPage />,
  },
  {
    path: "/post/edit/:postRef",
    element: <EditPostPage />,
  },

  // Diary
  {
    path: "/endless-thoughts-diary",
    element: <EndlessThoughtsDiaryPage />,
  },

  // Ease Companions
  {
    path: "/ease-companions",
    element: <EaseCompanionsPage />,
  },
  {
    path: "/ease-companion/:companionRef",
    element: <EaseCompanionViewPage />,
  },

  // Community Groups
  {
    path: "/community-groups",
    element: <CommunityGroupsPage />,
  },
  {
    path: "/community-group/:communityGroupRef",
    element: <CommunityGroupViewPage />,
  },

  // Owned Groups
  {
    path: "/owned-groups",
    element: <OwnedGroupsPage />,
  },
  {
    path: "/owned-group/:ownedGroupRef",
    element: <OwnedGroupsViewPage />,
  },
  {
    path: "/owned-group/create",
    element: <CreateGroupPage />,
  },
  {
    path: "/owned-group/add-photo",
    element: <PhotoControlPage />,
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
    path: "/joined-group/:joinedGroupRef",
    element: <JoinedGroupViewPage />,
  },

  // Pending
  {
    path: "/pending-approval",
    element: <PendingApprovalPage />,
  },
  {
    path: "/pending-approval/:pendingApprovalRef",
    element: <PendingApprovalPageView />,
  },

  // Saved
  {
    path: "/saved",
    element: <SavedPage />,
  },
];

export default navRoutes;

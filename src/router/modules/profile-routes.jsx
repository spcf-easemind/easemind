import EditProfilePage from "../../pages/edit-profile/EditProfilePage";
import ChangePasswordPage from "../../pages/change-password/ChangePasswordPage";
import EaseCompanionOverview from "../../pages/ease-companion-overview/EaseCompanionOverviewPage";
import AnonymousNotifications from "../../pages/anonymous-notifications/AnonymousNotifications";
import TermsConditions from "../../pages/terms-conditions/TermsConditionsPage";
import PrivacyPolicyPage from "../../pages/privacy-policy/PrivacyPolicyPage";
import AboutUsPage from "../../pages/about-us/AboutUsPage";

const profileRoutes = [
  {
    path: "/edit-profile",
    element: <EditProfilePage />,
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "/ease-companion-overview",
    element: <EaseCompanionOverview />,
  },
  {
    path: "/anonymous-notifications",
    element: <AnonymousNotifications />,
  },
  {
    path: "/terms-conditions",
    element: <TermsConditions />,
  },
  {
    path: "/terms-conditions",
    element: <TermsConditions />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/about-us",
    element: <AboutUsPage />,
  },
];

export default profileRoutes;

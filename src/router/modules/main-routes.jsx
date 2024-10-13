import ChatPage from "../../pages/ChatPage.jsx";
import HomePage from "../../pages/HomePage.jsx";

const mainRoutes = [
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/profile",
    element: "",
  },
];

export default mainRoutes;

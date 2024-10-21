import ChatPage from "../../pages/ChatPage.jsx";
import HomePage from "../../pages/HomePage.jsx";

// Loaders
import { ChatLoader } from "../loaders/ChatLoader.jsx";

const mainRoutes = [
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/chat/:chatRef?",
    element: <ChatPage />,
  },
];

export default mainRoutes;

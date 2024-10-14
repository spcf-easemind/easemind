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
    path: "/chat",
    element: <ChatPage />,
    loader: ChatLoader,
    children: [
      {
        path: ":chatRef",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: "",
  },
];

export default mainRoutes;

import { createBrowserRouter } from "react-router-dom";

// Components
import App from "../App";
import LoginPage from "../pages/LoginPage";
import InternetIdentityPage from "../pages/InternetIdentityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "internet-identity",
        element: <InternetIdentityPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "chat",
        element: "",
        children: [],
      },
    ],
  },
]);


export default router;

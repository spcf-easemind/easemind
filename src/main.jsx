import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Mantine Dependencies
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme, resolver } from "./plugins/mantine.js";
import { Notifications } from "@mantine/notifications";

// React Router
import AppRouter from "./router/AppRouter.jsx";

// Light Gallery
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <AppRouter />
      <Notifications />
    </MantineProvider>
  </StrictMode>
);

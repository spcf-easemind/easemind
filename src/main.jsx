import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Mantine Dependencies
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { theme, resolver } from "./plugins/mantine.js";

// React Router
import AppRouter from "./router/AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <ModalsProvider>
        <AppRouter />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>
);

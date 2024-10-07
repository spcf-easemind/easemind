import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Mantine Dependencies
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "./plugins/mantine.js";

// React Router
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);

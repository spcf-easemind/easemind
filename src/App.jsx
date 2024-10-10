import classes from "./App.module.css";

// Mantine Components
import { AppShell, Container } from "@mantine/core";
import { useMatches } from "@mantine/core";

// Components
import Header from "./components/headers/Header.jsx";
import MainHeader from "./components/headers/MainHeader.jsx";
import Navigation from "./components/Navigation.jsx";
import AsidePage from "./pages/AsidePage.jsx";

// React Router
import { Outlet, useLocation } from "react-router-dom";
import { useDialogStore } from "./store/dialog.js";

// Constants
const isBackgroundRoutes = ["/chat", "/internet-identity"];
const notNavbarRoutes = ["/internet-identity", "/", "/login"];

const containerBreakpoint = 1280;

function App() {
  const location = useLocation();
  const mobileOpened = useDialogStore((state) => state.aside.mobile);
  const desktopOpened = useDialogStore((state) => state.aside.desktop);

  const mainHeight = useMatches({
    base: "100%",
    sm: "90dvh",
  });

  const withContainer =
    location.pathname === "/chat" ? (
      <Outlet />
    ) : (
      <Container size={containerBreakpoint} h="100%">
        <Outlet />
      </Container>
    );

  const whichHeader =
    location.pathname === "/chat" ? <MainHeader /> : <Header />;

  const isBackground = !isBackgroundRoutes.includes(location.pathname)
    ? classes.bgImage
    : null;

  const isNavbar = notNavbarRoutes.includes(location.pathname);

  return (
    <AppShell
      header={{ height: { base: 60, sm: 70 } }}
      navbar={{
        width: 400,
        breakpoint: "sm",
        collapsed: { mobile: !false, desktop: !true },
      }}
      styles={{
        main: {
          height: mainHeight,
        },
      }}
      aside={{
        width: 350,
        breakpoint: "md",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Container size={containerBreakpoint} h="inherit">
          {whichHeader}
        </Container>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navigation />
      </AppShell.Navbar>
      <AppShell.Main className={isBackground}>{withContainer}</AppShell.Main>
      <AppShell.Aside
        p="md"
        style={{
          overflowY: "auto",
        }}
      >
        <AsidePage />
      </AppShell.Aside>
      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
}

export default App;

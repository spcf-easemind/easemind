import classes from "./App.module.css";
import { useMemo } from "react";

// Mantine Components
import { AppShell, Container } from "@mantine/core";
import { useMatches } from "@mantine/core";

// Components
import Header from "./components/headers/Header.jsx";
import MainHeader from "./components/headers/MainHeader.jsx";
import ChatNavigation from "./components/navigations/ChatNavigation.jsx";
import HomeNavigation from "./components/navigations/HomeNavigation.jsx";
import AsidePage from "./pages/AsidePage.jsx";

// Zustand
import { useDialogStore } from "./store/dialog.js";

// React Router
import { Outlet, useLocation } from "react-router-dom";
import mainRoutes from "./router/modules/main-routes.jsx";
import navRoutes from "./router/modules/nav-routes.jsx";

const containerBreakpoint = 1280;

function App() {
  // Hooks
  const location = useLocation();

  //Conditionals
  const { mobile: mobileOpened, desktop: desktopOpened } = useDialogStore(
    (state) => state.aside
  );
  const { mobile: drawerMobileOpened, desktop: drawerDesktopOpened } =
    useDialogStore((state) => state.drawer);

  const mainHeight = useMatches({
    base: "100%",
    sm: "90dvh",
  });

  // Filter Routes that include Navigation
  const includeNavigation = useMemo(() => {
    let paths = [];
    const notIncludedInMainRoutes = ["/profile", "/miscellaneous"];
    const mapMainRoutes = mainRoutes
      .filter(({ path }) => !notIncludedInMainRoutes.includes(path))
      .map(({ path }) => path);
    const mapNavRoutes = navRoutes.map(({ path }) => path);

    // Final Data
    paths = [...mapMainRoutes, ...mapNavRoutes];

    return paths.some((path) => location.pathname.startsWith(path));
  }, [location]);

  const navWithoutPadding = useMemo(() => {
    let paths = ["/home"];
    const mapNavRoutes = navRoutes.map(({ path }) => path);
    paths = [...paths, ...mapNavRoutes];

    return paths.some((path) => location.pathname.startsWith(path))
      ? undefined
      : "lg";
  }, [location]);

  // Adjusted logic to include /chat and /chat/:chatRef for header
  const whichHeader = includeNavigation ? <MainHeader /> : <Header />;

  // Adjusted logic to include /chat and /home for navigation
  const whichNavigation = location.pathname.startsWith("/chat") ? (
    <ChatNavigation />
  ) : (
    <HomeNavigation />
  );

  const withContainer = includeNavigation ? (
    <Outlet />
  ) : (
    <Container size={containerBreakpoint} h="100%">
      <Outlet />
    </Container>
  );

  const withBackground = useMemo(() => {
    let paths = ["internet-identity"];
    const mapMainRoutes = mainRoutes.map(({ path }) => path);
    const mapNavRoutes = navRoutes.map(({ path }) => path);

    // Final Paths
    paths = [...paths, ...mapMainRoutes, ...mapNavRoutes];

    if (!paths.some((path) => location.pathname.startsWith(path))) {
      return classes.bgImage;
    }
    return null;
  }, []);

  // Collapse Drawer and Aside
  const { handleDrawerMobile, handleDrawerDesktop } = includeNavigation
    ? {
        handleDrawerMobile: !drawerMobileOpened,
        handleDrawerDesktop: !drawerDesktopOpened,
      }
    : { handleDrawerMobile: true, handleDrawerDesktop: true };
  const { handleAsideMobile, handleAsideDesktop } = includeNavigation
    ? { handleAsideMobile: !mobileOpened, handleAsideDesktop: !desktopOpened }
    : { handleAsideMobile: true, handleAsideDesktop: true };

  return (
    <AppShell
      header={{ height: { base: 60, sm: 70 } }}
      navbar={{
        width: {base: 300, lg: 325, xl: 350},
        breakpoint: "sm",
        collapsed: { mobile: handleDrawerMobile, desktop: handleDrawerDesktop },
      }}
      aside={{
        width: { base: 275, lg: 300, xl: 325 },
        breakpoint: "md",
        collapsed: { mobile: handleAsideMobile, desktop: handleAsideDesktop },
      }}
      styles={{
        main: {
          height: mainHeight,
        },
      }}
    >
      <AppShell.Header>
        <Container size={containerBreakpoint} h="inherit">
          {whichHeader}
        </Container>
      </AppShell.Header>
      <AppShell.Navbar p={navWithoutPadding}>{whichNavigation}</AppShell.Navbar>
      <AppShell.Main className={withBackground}>{withContainer}</AppShell.Main>
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

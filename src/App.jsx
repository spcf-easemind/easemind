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
import ChatAside from "./components/asides/ChatAside.jsx";
import HomeAside from "./components/asides/HomeAside.jsx";

// Zustand
import { useDialogStore } from "./store/dialog.js";

// React Router
import { Outlet, useLocation, matchPath } from "react-router-dom";
import mainRoutes from "./router/modules/main-routes.jsx";
import navRoutes from "./router/modules/nav-routes.jsx";

const containerBreakpoint = 1280;

function routeMatcher(pattern, pathname) {
  const result = matchPath(pattern, pathname);
  if (result) {
    return result.pattern.path;
  }
  return;
}

function App() {
  // Hooks
  const location = useLocation();

  //Zustand
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

    return paths.some((path) => routeMatcher(path, location.pathname) === path);
  }, [location]);

  const navWithoutPadding = useMemo(() => {
    let paths = ["/home"];
    const mapNavRoutes = navRoutes.map(({ path }) => path);
    paths = [...paths, ...mapNavRoutes];

    return paths.some((path) => routeMatcher(path, location.pathname) === path)
      ? undefined
      : "lg";
  }, [location]);

  // Adjusted logic to include /chat and /chat/:chatRef for header
  const whichHeader = useMemo(() => {
    let paths = [];
    const mapMainRoutes = mainRoutes.map(({ path }) => path);
    const mapNavRoutes = navRoutes.map(({ path }) => path);

    paths = [...mapMainRoutes, ...mapNavRoutes];
    return paths.some(
      (path) => routeMatcher(path, location.pathname) === path
    ) ? (
      <MainHeader />
    ) : (
      <Header />
    );
  }, [location]);

  // Adjusted logic to include /chat and /home for navigation
  const whichNavigation = location.pathname.startsWith("/chat") ? (
    <ChatNavigation />
  ) : (
    <HomeNavigation />
  );
  
  // Adjusted logic for aside
   const whichAside = location.pathname.startsWith("/chat") ? (
    <ChatAside />
  ) : (
    <HomeAside />
  ); 


  const withContainer = includeNavigation ? (
    <Outlet />
  ) : (
    <Container size={containerBreakpoint} h="100%">
      <Outlet />
    </Container>
  );

  const mainPadding = includeNavigation ? 18 : undefined;

  const withBackground = useMemo(() => {
    let paths = ["/internet-identity"];
    const mapMainRoutes = mainRoutes.map(({ path }) => path);
    const mapNavRoutes = navRoutes.map(({ path }) => path);

    // Final Paths
    paths = [...paths, ...mapMainRoutes, ...mapNavRoutes];

    if (!paths.some((path) => routeMatcher(path, location.pathname) === path)) {
      return classes.bgImage;
    }
    return null;
  }, [location]);

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
      padding={mainPadding}
      header={{ height: { base: 60, sm: 70 } }}
      navbar={{
        width: { base: 300, lg: 325, xl: 350 },
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
        {whichAside}
      </AppShell.Aside>
      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
}

export default App;

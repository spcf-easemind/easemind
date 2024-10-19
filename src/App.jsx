import classes from "./App.module.css";
import { useMemo } from "react";

// Mantine Components
import { AppShell, Container } from "@mantine/core";

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
import profileRoutes from "./router/modules/profile-routes.jsx";
import ProfileNavigation from "./components/navigations/ProfileNavigation.jsx";

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

  // Filter Routes that include Navigation
  const includeNavigation = useMemo(() => {
    let navPaths = [];
    let asidePaths = [];
    const notIncludedInMainRoutes = ["/miscellaneous"];
    const mapMainRoutes = mainRoutes
      .filter(({ path }) => !notIncludedInMainRoutes.includes(path))
      .map(({ path }) => path);
    const mapNavRoutes = navRoutes.map(({ path }) => path);
    const mapProfileRoutes = profileRoutes.map(({ path }) => path);

    // Final Data
    navPaths = [...mapMainRoutes, ...mapNavRoutes, ...mapProfileRoutes];
    asidePaths = [...mapMainRoutes, ...mapNavRoutes];

    const navigation = navPaths.some(
      (path) => routeMatcher(path, location.pathname) === path
    );
    const aside = asidePaths.some(
      (path) => routeMatcher(path, location.pathname) === path
    );

    return { navigation, aside };
  }, [location]);

  const navWithoutPadding = useMemo(() => {
    let paths = ["/home"];
    const mapNavRoutes = navRoutes.map(({ path }) => path);
    const mapProfileRoutes = profileRoutes.map(({ path }) => path);
    paths = [...paths, ...mapNavRoutes, ...mapProfileRoutes];

    return paths.some((path) => routeMatcher(path, location.pathname) === path)
      ? undefined
      : "lg";
  }, [location]);

  // Adjusted logic to include /chat and /chat/:chatRef for header
  const whichHeader = useMemo(() => {
    let paths = [];
    const mapMainRoutes = mainRoutes.map(({ path }) => path);
    const mapNavRoutes = navRoutes.map(({ path }) => path);
    const mapProfileRoutes = profileRoutes.map(({ path }) => path);

    paths = [...mapMainRoutes, ...mapNavRoutes, ...mapProfileRoutes];
    return paths.some(
      (path) => routeMatcher(path, location.pathname) === path
    ) ? (
      <MainHeader />
    ) : (
      <Header />
    );
  }, [location]);

  // Adjusted logic to include /chat and /home for navigation
  const whichNavigation = useMemo(() => {
    const mainRoutes = ["/home"];
    const mapNavRoutes = navRoutes.map(({ path }) => path);
    const mapProfileRoutes = profileRoutes.map(({ path }) => path);

    const mainPaths = [...mainRoutes, ...mapNavRoutes];
    const computedMainPaths = mainPaths.some(
      (path) => routeMatcher(path, location.pathname) === path
    );
    const computedProfilePaths = mapProfileRoutes.some(
      (path) => routeMatcher(path, location.pathname) === path
    );

    if (location.pathname.startsWith("/chat")) {
      return <ChatNavigation />;
    } else if (computedMainPaths) {
      return <HomeNavigation />;
    } else if (computedProfilePaths) {
      return <ProfileNavigation />;
    }
  }, [location.pathname]);

  // Adjusted logic for aside
  const whichAside = location.pathname.startsWith("/chat") ? (
    <ChatAside />
  ) : (
    <HomeAside />
  );

  const withContainer = includeNavigation.navigation ? (
    <Outlet />
  ) : (
    <Container size={containerBreakpoint} h="100%">
      <Outlet />
    </Container>
  );

  const chatValues = useMemo(() => {
    const pathsWithoutPadding = [
      "/chat",
      "/chat/:chatRef",
      "/internet-identity",
      "/login",
    ];
    return pathsWithoutPadding.some(
      (path) => routeMatcher(path, location.pathname) === path
    )
      ? { padding: undefined, height: "calc(100vh - 60px" }
      : { padding: 18, height: "100%" };
  }, [location]);

  const withBackground = useMemo(() => {
    let paths = ["/internet-identity"];
    const mapMainRoutes = mainRoutes.map(({ path }) => path);
    const mapNavRoutes = navRoutes.map(({ path }) => path);
    const mapProfileRoutes = profileRoutes.map(({ path }) => path);

    // Final Paths
    paths = [...paths, ...mapMainRoutes, ...mapNavRoutes, ...mapProfileRoutes];

    if (!paths.some((path) => routeMatcher(path, location.pathname) === path)) {
      return classes.bgImage;
    }
    return null;
  }, [location]);

  // Collapse Drawer and Aside
  const { handleDrawerMobile, handleDrawerDesktop } =
    includeNavigation.navigation
      ? {
          handleDrawerMobile: !drawerMobileOpened,
          handleDrawerDesktop: !drawerDesktopOpened,
        }
      : { handleDrawerMobile: true, handleDrawerDesktop: true };

  const { handleAsideMobile, handleAsideDesktop } = includeNavigation.aside
    ? { handleAsideMobile: !mobileOpened, handleAsideDesktop: !desktopOpened }
    : { handleAsideMobile: true, handleAsideDesktop: true };

  return (
    <AppShell
      padding={chatValues.padding}
      header={{ height: { base: 60, sm: 70 } }}
      navbar={{
        width: { base: 300, lg: 325, xl: 350 },
        breakpoint: "sm",
        collapsed: { mobile: handleDrawerMobile, desktop: handleDrawerDesktop },
      }}
      aside={{
        width: { base: 275, lg: 300, xl: 375 },
        breakpoint: "md",
        collapsed: { mobile: handleAsideMobile, desktop: handleAsideDesktop },
      }}
      styles={{
        main: {
          height: chatValues.height,
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

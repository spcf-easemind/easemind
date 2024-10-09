import classes from "./App.module.css";

// Mantine Components
import { AppShell, Container } from "@mantine/core";
import { useMatches } from "@mantine/core";

// Components
import Header from "./components/headers/Header.jsx";
import MainHeader from "./components/headers/MainHeader.jsx";
import Navigation from "./components/Navigation.jsx";

// React Router
import { Outlet, useLocation } from "react-router-dom";

// Constants
const isBackgroundRoutes = ["/chat", "/internet-identity" ];
const notNavbarRoutes = [ "/internet-identity", "/" ];

const containerBreakpoint = 1280;

function App() {
  const location = useLocation();

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
        // collapsed: { desktop: isNavbar },
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
      <AppShell.Navbar p='md'>
        <Navigation/>
      </AppShell.Navbar>
      <AppShell.Main className={isBackground}>
        {withContainer}
      </AppShell.Main>
      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
}

export default App;

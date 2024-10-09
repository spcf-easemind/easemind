import classes from "./App.module.css";

// Mantine Components
import { AppShell, Container } from "@mantine/core";
import { useMatches } from "@mantine/core";

// Components
import Header from "./components/headers/Header.jsx";
import MainHeader from "./components/headers/MainHeader.jsx";

// React Router
import { Outlet, useLocation } from "react-router-dom";

const containerBreakpoint = 1280;

function App() {
  const location = useLocation();

  const mainHeight = useMatches({
    base: "100%",
    sm: "90dvh",
  });

  const whichHeader =
    location.pathname === "/chat" ? <MainHeader /> : <Header />;

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, sm: 70 } }}
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
      <AppShell.Main className={classes.bgImage}>
        <Container size={containerBreakpoint} h="100%">
          <Outlet />
        </Container>
      </AppShell.Main>
      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
}

export default App;

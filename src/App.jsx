import classes from "./App.module.css";

// Mantine Components
import { AppShell, Container } from "@mantine/core";

// Components
import Header from "./components/Header.jsx";

// React Router
import { Outlet } from "react-router-dom";

const containerBreakpoint = 1280;

function App() {
  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, sm: 70 } }}
      styles={{
        main: {
          height: "90dvh",
        },
      }}
    >
      <AppShell.Header>
        <Container size={containerBreakpoint} h="inherit">
          <Header />
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

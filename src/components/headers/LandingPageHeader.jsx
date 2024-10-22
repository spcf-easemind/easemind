import { useState } from "react";
import { useDialogStore } from "../../store/dialog";

// Mantine Components
import { Button, Group, Box, Title, Image, Anchor } from "@mantine/core";

// SVGs
import EaseMind from "../../assets/logos/EaseMindVersion2.svg";

// Styles
import classes from "./LandingPageHeader.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const data = [
  {
    name: "Home",
    route: "home",
  },
  {
    name: "About Us",
    route: "about-us",
  },
  {
    name: "Features",
    route: "features",
  },
  {
    name: "Services",
    route: "services",
  },

  {
    name: "Team",
    route: "team",
  },
  {
    name: "Contact",
    route: "contact",
  },
];

export default function Header() {
  const [active, setActive] = useState();
  const toggleDialogFn = useDialogStore((state) => state.toggleDialog);
  const location = useLocation();
  const navigate = useNavigate();

  const TitleComponent = Title.withProps({
    order: 3,
    style: { fontFamily: "var(--mantine-baloo-bhai-2)" },
    tt: "uppercase",
  });

  const TitleSection = (
    <Group justify="start">
      <Image h={25} src={EaseMind} />
      <TitleComponent>EaseMind</TitleComponent>
    </Group>
  );

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const menuLinks = data.map((item) => (
    <Anchor
      visibleFrom="sm"
      className={classes.mainLink}
      data-active={item.name === active || undefined}
      key={item.name}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.name);
        scrollToSection(item.route);
      }}
    >
      {item.name}
    </Anchor>
  ));

  function handleButtonClick() {
    if (location.pathname === "/login") {
      toggleDialogFn();
    } else {
      navigate("/login");
    }
  }

  const ButtonInstance = (
    <Button onClick={handleButtonClick} ml={3}>
      Get Started
    </Button>
  );

  return (
    <Group h="100%" justify="space-between" align="center">
      <Box maw="200">{TitleSection}</Box>

      <Group justify="end">
        {menuLinks} {ButtonInstance}
      </Group>

      {/* <Box maw="200" ta="end">
      </Box> */}
    </Group>
  );
}

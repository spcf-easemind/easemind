import { useState } from "react";
import { useDialogStore } from "../../store/dialog";

// Mantine Components
import { Button, Group, Box, Title, Image, Anchor } from "@mantine/core";

// SVGs
import EaseMind from "../../assets/logos/EaseMind.svg";

// Styles
import classes from "./Header.module.css";

const data = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "About Us",
    route: "/about-us",
  },
];

export default function Header() {
  const [active, setActive] = useState();
  const toggleDialogFn = useDialogStore((state) => state.toggleDialog);

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

  const menuLinks = data.map((item) => (
    <Anchor
      visibleFrom="sm"
      className={classes.mainLink}
      data-active={item.name === active || undefined}
      key={item.name}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.name);
      }}
    >
      {item.name}
    </Anchor>
  ));

  const ButtonInstance = (
    <Button onClick={() => toggleDialogFn()}>Get Started</Button>
  );

  return (
    <Group h="100%" justify="space-between" align="center">
      <Box maw="200">{TitleSection}</Box>

      <Group justify="center" maw="200">
        {menuLinks}{" "}
      </Group>

      <Box maw="200" ta="end">
        {ButtonInstance}
      </Box>
    </Group>
  );
}

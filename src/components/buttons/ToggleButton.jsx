import {
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

export default function ToggleButton({ active, name, children, onClick }) {
  const isActive = active === name;
  const { colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(colorScheme);

  const btnColors =
    computedColorScheme === "dark"
      ? { active: "sky-blue", inactive: "dark.3" }
      : { active: "sky-blue", inactive: "dark.1" };
  const btnBgColors =
    computedColorScheme === "dark"
      ? { active: undefined, inactive: "dark.6" }
      : { active: undefined, inactive: undefined };

  return (
    <Button
      onClick={onClick}
      h={100}
      variant={isActive ? "outline" : "light"}
      fw={isActive ? 500 : 400}
      c={isActive ? btnColors.active : btnColors.inactive}
      bg={isActive ? btnBgColors.active : btnBgColors.inactive}
      size="xl"
      radius="md"
    >
      {children}
    </Button>
  );
}

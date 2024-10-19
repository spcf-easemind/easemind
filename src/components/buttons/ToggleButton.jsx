import { Button } from "@mantine/core";

export default function ToggleButton({ active, name, children, onClick }) {
  const isActive = active === name;
  return (
    <Button
      onClick={onClick}
      h={100}
      variant={isActive ? "outline" : "light"}
      fw={isActive ? 500 : 400}
      c={isActive ? "sky-blue" : "dark.1"}
      size="xl"
      radius="md"
    >
      {children}
    </Button>
  );
}

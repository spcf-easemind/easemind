import { createTheme } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  colors: {
    "sky-blue": generateColors("#4A90E2"),
  },
  primaryColor: "sky-blue"
});

export default theme;

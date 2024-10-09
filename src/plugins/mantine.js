import { createTheme } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  colors: {
    "sky-blue": generateColors("#4A90E2"),
  },
  primaryColor: "sky-blue",
  other: {
    balooBhaiFont: '"Baloo Bhai 2", sans-serif',
  },
});

const resolver = (theme) => ({
  variables: {
    "--mantine-baloo-bhai-2": theme.other.balooBhaiFont,
  },
});

export { theme, resolver };

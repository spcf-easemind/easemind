import { Box } from "@mantine/core";

export default function ChatBox({ children, ...props }) {
  return <Box {...props}>{children}</Box>;
}

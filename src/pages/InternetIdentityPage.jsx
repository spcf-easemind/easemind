import {
  Stack,
  Title,
  Text,
  Button,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";

// Zustand
import { useAuthenticationStore } from "../store/authentication.js";
import { useShallow } from "zustand/shallow";
// React Router
import { useNavigate } from "react-router-dom";

export default function InternetIdentityPage() {
  const navigate = useNavigate();

  const { colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(colorScheme);
  const buttonColor = computedColorScheme === "dark" ? "white" : "black";

  const { authenticate, loading } = useAuthenticationStore(
    useShallow((state) => ({
      authenticate: state.authenticateInternetIdentity,
      loading: state.loading,
    }))
  );

  async function authenticateFn() {
    await authenticate();

    // Navigate to the login page
    return navigate("/login");
  }
  return (
    <Stack justify="center" align="center" h="100%" ta="center">
      <Title
        size={64}
        style={{
          fontFamily: "var(--mantine-baloo-bhai-2)",
        }}
      >
        Explore. Dream.
        <br />
        Discover. Infinity.
      </Title>

      <Text size="xl">Sign in to begin your Web3 journey.</Text>

      <Button
        color={buttonColor}
        variant="outline"
        mt={16}
        size="md"
        onClick={() => authenticateFn()}
        loading={loading}
      >
        Continue with Internet Identity
      </Button>
    </Stack>
  );
}

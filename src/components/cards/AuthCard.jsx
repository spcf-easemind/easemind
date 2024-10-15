import classes from "./AuthCard.module.css";
import { Card, Title, Text, Stack, Anchor, Button } from "@mantine/core";
import { useMatches } from "@mantine/core";

export default function AuthCard({
  form,
  onSubmit,
  onDialogOpen,
  children,
  heading: { title, description },
  buttonLabel,
}) {
  function handleSubmit(formData) {
    onSubmit(formData);
  }

  function handleCreateAccount() {
    onDialogOpen();
  }

  const titleFontSize = useMatches({
    base: 24,
    md: 36,
  });

  const subtitleFontSize = useMatches({
    base: 13,
    sm: 16,
  });

  const marginBottom = useMatches({
    base: 16,
    md: 32,
  });

  const cardPadding = useMatches({
    base: 30,
    md: 40,
  });

  return (
    <Card padding={cardPadding} className={classes.card} radius="lg">
      <Stack align="center" w="inherit" mb={marginBottom}>
        <Title size={titleFontSize} className={classes.title}>
          {title}
        </Title>
        <Text ta="center" fz={subtitleFontSize} className={classes.subTitle}>
          {description}
        </Text>
      </Stack>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {children}

        <Button type="submit" radius="md" size="md" fullWidth mb={marginBottom}>
          {buttonLabel}
        </Button>
      </form>

      <Text size="sm" ta="center">
        {"Don’t have an account? "}
        <Anchor
          size="sm"
          component="a"
          underline="never"
          onClick={handleCreateAccount}
        >
          Create Account
        </Anchor>
      </Text>
    </Card>
  );
}

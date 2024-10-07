import classes from "./AuthCard.module.css";

import {
  Card,
  Title,
  Text,
  Stack,
  TextInput,
  Checkbox,
  Group,
  Anchor,
  Button,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useMatches } from "@mantine/core";

const cardForms = {
  login: [
    {
      type: "text",
      name: "email",
      label: "Email Address",
      placeholder: "Email Address",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Password",
    },
  ],
};

export default function AuthCard({ formType, onSubmit, onDialogOpen }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6
          ? "Password should be at least 6 characters long"
          : null,
    },
  });

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

  const textMarginBottom = useMatches({
    base: 12,
    md: 22,
  });

  const textInputSize = useMatches({
    base: "sm",
    md: "md",
  });

  const cardPadding = useMatches({
    base: 30,
    md: 40,
  });

  const inputInstances = cardForms[formType].map((item) => (
    <TextInput
      styles={{
        input: {
          borderColor: "var(--mantine-color-gray-6)",
        },
      }}
      size={textInputSize}
      mb={textMarginBottom}
      type={item.type}
      placeholder={item.placeholder}
      key={form.key(item.name)}
      {...form.getInputProps(item.name)}
    />
  ));

  return (
    <Card padding={cardPadding} className={classes.card} radius="lg">
      <Stack align="center" w="inherit" mb={marginBottom}>
        <Title size={titleFontSize} className={classes.title}>
          Login
        </Title>
        <Text ta="center" fz={subtitleFontSize} className={classes.subTitle}>
          Experience welcome and transform into something new as you embark on a
          journey of self-discovery.
        </Text>
      </Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {inputInstances}

        <Group justify="space-between" mb={marginBottom}>
          <Checkbox label="Remember me" c="gray.6" />
          <Anchor size="sm" component="button" underline="never">
            Forgot Password?
          </Anchor>
        </Group>

        <Button type="submit" radius="md" size="md" fullWidth mb={marginBottom}>
          Login
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

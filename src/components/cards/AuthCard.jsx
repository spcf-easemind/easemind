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

export default function AuthCard({ formType, onSubmit }) {
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

  const inputInstances = cardForms[formType].map((item) => (
    <TextInput
      styles={{
        input: {
          borderColor: "var(--mantine-color-gray-6)",
        },
      }}
      size="md"
      mb={22}
      type={item.type}
      placeholder={item.placeholder}
      key={form.key(item.name)}
      {...form.getInputProps(item.name)}
    />
  ));

  return (
    <Card padding={40} radius="lg">
      <Stack align="center" w="inherit" mb={32}>
        <Title size={40}>Login</Title>
        <Text ta="center">
          Experience welcome and transform into something new as you embark on a
          journey of self-discovery.
        </Text>
      </Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {inputInstances}

        <Group justify="space-between" mb={32}>
          <Checkbox label="Remember me" c="gray.6" />
          <Anchor size="sm" component="button" underline="never">
            Forgot Password?
          </Anchor>
        </Group>

        <Button type="submit" radius="md" size="md" fullWidth mb={32}>
          Login
        </Button>
      </form>

      <Text size="sm" ta="center">
        {"Don’t have an account? "}
        <Anchor size="sm" component="a" underline="never">
          Create Account
        </Anchor>
      </Text>
    </Card>
  );
}

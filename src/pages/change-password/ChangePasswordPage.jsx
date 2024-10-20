import { Card, Title, PasswordInput, Stack, Box, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ChangePasswordPage() {

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    },

    validate: {

    }
  })
  
  return (
    <Card
      px={20}
      py={28}
      mx="auto"
      bg="gray.0"
      withBorder
      radius="md"
      maw={800}
    >
      <Title ta="center" order={3}>
        Change Password
      </Title>

      <form>
        <Stack mt={18}>
          <PasswordInput size="lg" label="Current Password" />
          <PasswordInput size="lg" label="New Password" />
          <PasswordInput size="lg" label="Repar Password" />

          <Button type="submit" size="lg" fullWidth>Save Changes</Button>
        </Stack>
      </form>
    </Card>
  );
}

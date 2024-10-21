import { Card, Title, PasswordInput, Stack, Box, Button } from "@mantine/core";
import { useForm, hasLength, matchesField } from "@mantine/form";
import { useAuthenticationStore } from "../../store/authentication";
import { notificationsFn } from "../../utils/notifications";
import { useProfileAPIStore } from "../../store/profile-api";

export default function ChangePasswordPage() {
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const changePasswordFn = useProfileAPIStore((state) => state.changePassword);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      currentPassword: hasLength(
        { min: 6 },
        "Password must be at least 6 characters"
      ),
      newPassword: hasLength(
        { min: 6 },
        "New Password must be at least 6 characters"
      ),
      confirmPassword: matchesField("newPassword", "Passwords do not match"),
    },
  });

  async function handleChangePassword(value) {
    const id = notificationsFn.load();
    const formData = {
      ...value,
      userKey: loggedInUserKey,
    };

    console.log(formData);

    const response = await changePasswordFn(formData);

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      form.reset();
    } else {
      notificationsFn.error(id, response.message);
    }
  }

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

      <form onSubmit={form.onSubmit(handleChangePassword)}>
        <Stack mt={18}>
          <PasswordInput
            size="lg"
            label="Current Password"
            key={form.key("currentPassword")}
            {...form.getInputProps("currentPassword")}
          />
          <PasswordInput
            size="lg"
            label="New Password"
            key={form.key("newPassword")}
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            size="lg"
            label="Repeat New Password"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />

          <Button type="submit" size="lg" fullWidth>
            Save Changes
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

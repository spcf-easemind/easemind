import { Button, Paper, Stack, TextInput, Title } from "@mantine/core";
import { useForm, matchesField } from "@mantine/form";
import { useAuthenticationStore } from "../store/authentication";
import { useUsersStore } from "../store/users";

export default function SuperAdminPage() {
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );
  const superAdminFn = useUsersStore((state) => state.superAdmin);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
    },
  });

  async function handleSubmit() {
    await superAdminFn(loggedInUserKey);
  }

  return (
    <Paper>
      <Title order={3}>Super Admin</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Confirm Password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}

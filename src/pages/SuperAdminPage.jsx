import { Button, Paper, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function SuperAdminPage() {

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
    }
  })

  return (
    <Paper>
      <Title order={3}>Super Admin</Title>
      <form onSubmit={form}>
        <TextInput label="Input Password"/>
        <Button type="submit">Submit</Button>
      </form>
    </Paper>
  )
}
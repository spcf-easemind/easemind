import {
  Group,
  Modal,
  Stack,
  TextInput,
  Select,
  PasswordInput,
} from "@mantine/core";
import AuthCard from "../cards/AuthCard";
import { DATE_SELECTS } from "../../static/date";
export default function SignUpModal({
  form,
  opened,
  onClose,
  onSubmit,
  onNavigate,
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={500}
      padding={0}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
      withCloseButton={false}
      radius="lg"
    >
      <AuthCard
        form={form}
        onSubmit={onSubmit}
        onDialogOpen={onNavigate}
        heading={{
          title: "Sign Up",
          description:
            "Take the first step toward better mental health and well-being today, and unlock the support you deserve.",
        }}
        buttonLabel="Sign Up"
      >
        <Stack mb={32}>
          <TextInput
            label="Full name"
            size="md"
            styles={{
              input: {
                borderColor: "var(--mantine-color-gray-6)",
              },
            }}
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
          />

          <Group align="end" grow wrap="no-wrap">
            <Select
              label="Date of birth"
              size="md"
              data={DATE_SELECTS.month}
              searchable
              key={form.key("date.month")}
              {...form.getInputProps("date.month")}
              styles={{
                input: {
                  borderColor: "var(--mantine-color-gray-6)",
                },
              }}
            />
            <Select
              size="md"
              data={DATE_SELECTS.day}
              searchable
              key={form.key("date.day")}
              {...form.getInputProps("date.day")}
              styles={{
                input: {
                  borderColor: "var(--mantine-color-gray-6)",
                },
              }}
            />
            <Select
              size="md"
              data={DATE_SELECTS.year}
              searchable
              key={form.key("date.year")}
              {...form.getInputProps("date.year")}
              styles={{
                input: {
                  borderColor: "var(--mantine-color-gray-6)",
                },
              }}
            />
          </Group>

          <TextInput
            size="md"
            label="Mobile Number"
            type="telephone"
            leftSection={<small>+63 </small>}
            key={form.key("mobileNumber")}
            {...form.getInputProps("mobileNumber")}
            styles={{
              input: {
                borderColor: "var(--mantine-color-gray-6)",
              },
            }}
          />

          <TextInput
            size="md"
            label="Email Address"
            key={form.key("email")}
            {...form.getInputProps("email")}
            styles={{
              input: {
                borderColor: "var(--mantine-color-gray-6)",
              },
            }}
          />

          <PasswordInput
            label="Password"
            size="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
            styles={{
              input: {
                borderColor: "var(--mantine-color-gray-6)",
              },
            }}
          />
        </Stack>
      </AuthCard>
    </Modal>
  );
}

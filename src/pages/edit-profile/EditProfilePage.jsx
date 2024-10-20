import {
  Box,
  Button,
  Card,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import PhotoControlButton from "../../components/buttons/PhotoControlButton";
import { useForm } from "@mantine/form";
import { DATE_SELECTS } from "../../static/date";

export default function EditProfilePage() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      image: "",
    },
  });

  function handlePhotoControlButton() {
    console.log("PhotoControlButton clicked");
  }

  return (
    <>
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
          Edit Profile
        </Title>

        <Stack mt={18} align="center">
          <PhotoControlButton
            image={form.getValues().image}
            onClick={handlePhotoControlButton}
          />

          <form style={{ width: "100%" }}>
            <Stack>
              <TextInput size="lg" label="Full name" />

              <Group align="end" wrap="no-wrap">
                <Select
                  label="Date of birth"
                  size="lg"
                  data={DATE_SELECTS.month}
                  searchable
                />
                <Select size="lg" data={DATE_SELECTS.day} searchable />
                <Select size="lg" data={DATE_SELECTS.year} searchable />
              </Group>

              <TextInput
                size="lg"
                label="Mobile Number"
                type="telephone"
                leftSection={<small>+63 </small>}
              />

              <TextInput size="lg" label="Email Address" />

              <Button type="submit" fullWidth size="lg">
                Save Changes
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>

      <Card
        mt={18}
        px={20}
        py={28}
        mx="auto"
        bg="gray.0"
        withBorder
        radius="md"
        maw={800}
      >
        <Title order={3}>Account Deletion</Title>

        <Text mt={8} lh={1.2}>
          Delete your account permanently. This action cannot be undone, and all
          your data will be permanently erased and cannot be recovered.
        </Text>

        <Button mt={18} color="red.8" size="lg" w={200}>
          Delete Account
        </Button>
      </Card>
    </>
  );
}

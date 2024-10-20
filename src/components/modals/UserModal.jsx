import {
  Box,
  Card,
  Modal,
  Title,
  Text,
  Stack,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";

import InterestsMultiInputs from "../inputs/InterestsMultiInputs";
import AvailabilityMultiInputs from "../inputs/AvailabilityMultiInputs";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { AVAILABILITY_ATTRIBUTES } from "../../static/availability";
import { useEffect } from "react";

export default function UserModal({ modal: { opened, onClose }, instance, onFormSubmit }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      categories: [],
      availability: AVAILABILITY_ATTRIBUTES,

      // Initial
      initialCategories: [],
    },

    validate: {
      title: isNotEmpty("Title is required"),
      description: isNotEmpty("Description is required"),
      initialCategories: hasLength(
        { min: 1 },
        "Please select at least one interest"
      ),
    },
  });

  function formInitialize() {
    const { title, description, categories, availability } = instance;

    const mappedCategories = categories.map(({ key, data }) => ({
      tab: data.category,
      key,
      value: data.name,
    }));

    const formValues = {
      title: title,
      description: description,
      categories: [],
      availability: availability,
      initialCategories: mappedCategories,
    };

    form.initialize(formValues);
  }

  useEffect(() => {
    if (instance) {
      formInitialize();
    }
  }, [instance]);

  const interestsInputs = <InterestsMultiInputs form={{ form }} />;

  const availabilityInputs = <AvailabilityMultiInputs form={{ form }} />;

  function handleSubmit(data) {
    const formData = { ...data };

    const mappedCategories = formData.initialCategories.map(({ key }) => ({
      key,
    }));

    formData.categories = mappedCategories;
    delete formData.initialCategories;

    onFormSubmit(formData);
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="800"
      radius="md"
      padding={0}
      centered
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 5,
      }}
    >
      <Card padding={28}>
        <Box ta="center">
          <Title order={3}>Ease Companion Overview</Title>
          <Text size="sm">
            This post is a space to connect, share experiences, and offer mental
            health resources. Let's build a supportive community where we can
            grow and thrive together.
          </Text>
        </Box>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack mt={18}>
            <TextInput
              placeholder="Title"
              size="lg"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />

            <Textarea
              size="lg"
              placeholder="Description..."
              rows={6}
              key={form.key("description")}
              {...form.getInputProps("description")}
            />

            {interestsInputs}

            {availabilityInputs}

            <Button size="lg" type="submit">
              Save Changes
            </Button>
          </Stack>
        </form>
      </Card>
    </Modal>
  );
}

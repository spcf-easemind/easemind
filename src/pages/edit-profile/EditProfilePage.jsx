import {
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
import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import { DATE_SELECTS } from "../../static/date";
import { useProfileAPIStore } from "../../store/profile-api";
import { useFormStore } from "../../store/form";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseISO, getDate, getYear, getMonth, format, parse } from "date-fns";
import { notificationsFn } from "../../utils/notifications";
import { useDisclosure } from "@mantine/hooks";
import WarningModal from "../../components/modals/WarningModal";

const warningModal = {
  title: "Delete Account?",
  message:
    "Are you sure you want to delete your account? This action is permanent, and all your data will be erased and cannot be recovered.",
};

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [opened, { toggle }] = useDisclosure();

  const { fetchEditProfileFn, editProfile, updateProfileFn, deleteUserFn } =
    useProfileAPIStore(
      useShallow((state) => ({
        fetchEditProfileFn: state.fetchEditProfile,
        editProfile: state.editProfile,
        updateProfileFn: state.updateProfile,
        deleteUserFn: state.deleteUser,
      }))
    );

  const { savedForm, setSavedForm } = useFormStore(
    useShallow((state) => ({
      savedForm: state.form,
      setSavedForm: state.setForm,
    }))
  );

  useEffect(() => {
    fetchEditProfileFn();
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      profileImageUrl: "",
      pronouns: "",
      date: {
        month: "",
        day: "",
        year: "",
      },
      email: "",
      mobileNumber: "",
      fullName: "",
    },
    validate: {
      profileImageUrl: isNotEmpty("Please select a profile image"),
      "date.day": isNotEmpty("Day is required"),
      "date.month": isNotEmpty("Month is required"),
      "date.year": isNotEmpty("Year is required"),
      email: isEmail("A valid email is required"),
      mobileNumber: hasLength(
        { min: 10, max: 10 },
        "Mobile number should be exactly 10 characters long"
      ),
    },
  });

  function formInitialize() {
    const {
      dateOfBirth,
      email,
      fullName,
      mobileNumber,
      profileImageUrl,
      pronouns,
    } = editProfile?.data;

    const date = parseISO(dateOfBirth);
    const year = String(getYear(date));
    const month = String(getMonth(date) + 1);
    const day = String(getDate(date));

    const formValues = {
      profileImageUrl,
      pronouns,
      date: {
        year,
        month,
        day,
      },
      email,
      fullName,
      mobileNumber,
    };

    form.initialize(formValues);
  }

  useEffect(() => {
    if (editProfile) {
      formInitialize();
    }
  }, [editProfile]);

  function iterateSavedData() {
    for (const key in savedForm) {
      form.setFieldValue(key, savedForm[key]);
    }
  }

  useEffect(() => {
    if (savedForm) {
      iterateSavedData();
    }
  }, [savedForm]);

  function handlePhotoControlButton() {
    setSavedForm(form.getValues());
    navigate("/edit-profile/edit-photo");
  }

  async function handleFormSubmit(value) {
    const formData = { ...value };

    const date = format(
      parse(
        formData.date.year +
          "-" +
          formData.date.month +
          "-" +
          formData.date.day,
        "yyyy-MM-dd",
        new Date()
      ),
      "yyyy-MM-dd"
    );

    // Reassign and Delete Necessary Fields
    formData["dateOfBirth"] = date;
    formData["userKey"] = editProfile.key;
    delete formData.date;

    const id = notificationsFn.load();
    const response = await updateProfileFn(formData);

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      fetchEditProfileFn();
    } else {
      notificationsFn.error(id, response.message);
    }
  }

  async function handleDeletionAccount() {
    const id = notificationsFn.load();
    const response = await deleteUserFn();

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      navigate("/internet-identity");
    } else {
      notificationsFn.error(id, response.message);
    }
  }

  return (
    editProfile && (
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
              image={form.getValues().profileImageUrl}
              onClick={handlePhotoControlButton}
            />

            <form
              onSubmit={form.onSubmit(handleFormSubmit)}
              style={{ width: "100%" }}
            >
              <Stack>
                <Group>
                  <TextInput
                    flex={1}
                    size="lg"
                    label="Full name"
                    key={form.key("fullName")}
                    {...form.getInputProps("fullName")}
                  />
                  <Select
                    label="Pronouns"
                    size="lg"
                    data={["He/Him", "She/Her", "They/Them"]}
                    searchable
                    key={form.key("pronouns")}
                    {...form.getInputProps("pronouns")}
                  />
                </Group>

                <Group align="end" wrap="no-wrap">
                  <Select
                    label="Date of birth"
                    size="lg"
                    data={DATE_SELECTS.month}
                    searchable
                    key={form.key("date.month")}
                    {...form.getInputProps("date.month")}
                  />
                  <Select
                    size="lg"
                    data={DATE_SELECTS.day}
                    searchable
                    key={form.key("date.day")}
                    {...form.getInputProps("date.day")}
                  />
                  <Select
                    size="lg"
                    data={DATE_SELECTS.year}
                    searchable
                    key={form.key("date.year")}
                    {...form.getInputProps("date.year")}
                  />
                </Group>

                <TextInput
                  size="lg"
                  label="Mobile Number"
                  type="telephone"
                  leftSection={<small>+63 </small>}
                  key={form.key("mobileNumber")}
                  {...form.getInputProps("mobileNumber")}
                />

                <TextInput
                  size="lg"
                  label="Email Address"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />

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
            Delete your account permanently. This action cannot be undone, and
            all your data will be permanently erased and cannot be recovered.
          </Text>

          <Button onClick={toggle} mt={18} color="red.8" size="lg" w={200}>
            Delete Account
          </Button>
        </Card>

        <WarningModal
          modal={{ opened: opened, onClose: toggle }}
          form={{ ...warningModal }}
        >
          <Button onClick={toggle} variant="light" color="red">
            Cancel
          </Button>
          <Button onClick={handleDeletionAccount} loading={false} color="red">
            Delete Account
          </Button>
        </WarningModal>
      </>
    )
  );
}

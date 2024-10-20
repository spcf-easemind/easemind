import { Paper } from "@mantine/core";
import PostControlCard from "../../components/cards/posts/PostControlCard";
import { useForm, isNotEmpty } from "@mantine/form";
import { useAuthenticationStore } from "../../store/authentication";

const header = {
  title: "Create Post",
  description:
    "This post is a space to connect, share experiences, and offer mental health resources. Let's build a supportive community where we can grow and thrive together.",
};

export default function CreatePostPage() {
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      ownerKey: loggedInUserKey,
      name: "",
      description: "",
      categories: [],

      // Initial Values
      initialCategories: [],
    },

    validate: {
      name: isNotEmpty("Name is required"),
      description: isNotEmpty("Description is required"),
      initialCategories: (value) => {
        const filled = Object.values(value).some(
          (category) => category.key || category.value
        );
        return filled ? null : "At least one category should be filled.";
      },
    },
  });

  async function formSubmit(value) {
    let formData = { ...value };

    const mappedMembers = users
      .filter(({ key }) => formData.initialMembers.includes(key))
      .map((item) => ({
        fullName: item.data.fullName,
        key: item.key,
        lastUpdated: item.data.lastUpdated,
        role: item.data.role,
        status: item.data.status,
        groupRole: "Group Member",
      }));

    const mappedCategories = formData.initialCategories.map(({ key }) => ({
      key,
    }));

    // Reassign
    formData.members = [
      {
        fullName: currentUserValue.data.fullName,
        key: currentUserValue.key,
        lastUpdated: currentUserValue.data.lastUpdated,
        role: currentUserValue.data.role,
        status: currentUserValue.data.status,
        groupRole: "Group Admin",
      },
      ...mappedMembers,
    ];
    formData.categories = mappedCategories;

    // Remove initial values
    delete formData.initialMembers;
    delete formData.initialCategories;

    console.log(formData);
    await createGroupFn(formData);
  }

  return (
    <Paper>
      <PostControlCard
        form={{ form, onSubmit: formSubmit }}
        header={header}
        button={{ btnLabel: "Save Changes" }}
      />
    </Paper>
  );
}

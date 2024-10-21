import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/groups/GroupControlCard";
import { useNavigate } from "react-router-dom";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { useEnumsStore } from "../../store/enums";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useAuthenticationStore } from "../../store/authentication";
import { useFormStore } from "../../store/form";
import { notificationsFn } from "../../utils/notifications.jsx";
import { useGroupAPIStore } from "../../store/group-api";

const header = {
  title: "Create Group",
  description:
    "Create a group to connect with others, share experiences, and build a supportive community where everyone can grow and thrive together.",
};

const button = {
  btnLabel: "Create Group",
};

export default function CreateGroupPage() {
  const navigate = useNavigate();
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const createGroupFn = useGroupAPIStore((state) => state.createGroup);

  const { savedForm, setSavedForm } = useFormStore(
    useShallow((state) => ({
      savedForm: state.form,
      setSavedForm: state.setForm,
    }))
  );

  const { fetchUsersFn, users } = useEnumsStore(
    useShallow((state) => ({
      fetchUsersFn: state.fetchUsersEnum,
      users: state.users,
    }))
  );

  // Fetch Users Enum
  useEffect(() => {
    fetchUsersFn();
  }, []);

  const usersEnum = useMemo(() => {
    if (users.length > 0) {
      return users
        .filter(({ key }) => key !== loggedInUserKey)
        .map((user) => ({
          id: user.key,
          name: user.data.fullName,
          image: user.data?.profileImageUrl,
        }));
    }
    return [];
  }, [users]);

  const currentUserValue = useMemo(() => {
    if (users.length > 0) {
      return users.find(({ key }) => key === loggedInUserKey);
    }
    return null;
  }, [users]);

  function handleAddPhotoClick() {
    setSavedForm(form.getValues());
    navigate("/owned-group/add-photo");
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      ownerKey: loggedInUserKey,
      groupProfilePath: "",
      name: "",
      description: "",
      members: [],
      categories: [],

      // Initial Values
      initialMembers: [],
      initialCategories: [],
    },

    validate: {
      name: isNotEmpty("Name is required"),
      description: isNotEmpty("Description is required"),
      groupProfilePath: isNotEmpty("Group Profile is required"),
      initialCategories: (value) => {
        const filled = Object.values(value).some(
          (category) => category.key || category.value
        );
        return filled ? null : "At least one category should be filled.";
      },
      initialMembers: hasLength(
        {
          min: 1,
        },
        "Please select at least 2 members"
      ),
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
        profileImageUrl: item.data.profileImageUrl,
        pronouns: item.data.pronouns,
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
        profileImageUrl: currentUserValue.data.profileImageUrl,
        pronouns: currentUserValue.data.pronouns,
        groupRole: "Group Admin",
      },
      ...mappedMembers,
    ];
    formData.categories = mappedCategories;

    // const reducedMembers = formData.members.reduce(
    //   (acc, { profileImageUrl, fullName, key }) => {
    //     acc[key] = {
    //       image: profileImageUrl,
    //       name: fullName,
    //     };
    //     return acc;
    //   },
    //   {}
    // );

    // console.log(reducedMembers);

    // Remove initial values
    delete formData.initialMembers;
    delete formData.initialCategories;

    const id = notificationsFn.load();
    const response = await createGroupFn(formData);

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      setSavedForm(null);
      navigate(`/owned-group/${response.key}`);
    } else {
      notificationsFn.error(id, response.message);
    }
  }

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

  return (
    <>
      <Paper>
        <GroupControlCard
          header={header}
          button={button}
          enums={{ users: usersEnum }}
          form={{ form, onSubmit: formSubmit }}
          onPhotoControlClick={handleAddPhotoClick}
        />
      </Paper>
    </>
  );
}

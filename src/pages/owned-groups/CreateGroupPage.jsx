import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/GroupControlCard";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useEnumsStore } from "../../store/enums";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useAuthenticationStore } from "../../store/authentication";
import { useFormStore } from "../../store/form";
import { useGroupStore } from "../../store/group";

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

  const createGroupFn = useGroupStore((state) => state.createGroup);
  const getAllGroupsFn = useGroupStore((state) => state.getAllGroups);
  const groupData = useGroupStore((state) => state.groupData);

  console.log(groupData);

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

  useEffect(() => {
    fetchUsersFn();
    getAllGroupsFn();
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
      categories: {
        thoughts: {
          key: "",
          value: "",
        },
        emotions: {
          key: "",
          value: "",
        },
        members: {
          key: "",
          value: "",
        },
      },
      members: [],
      initialMembers: [],
    },
  });

  function formSubmit(value) {
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

    const mappedCategories = Object.entries(formData.categories).map(
      ([tab, { key, value }]) => ({ key })
    );

    formData.members = [
      {
        fullName: currentUserValue.data?.fullName,
        key: currentUserValue.key,
        lastUpdated: currentUserValue.data?.lastUpdated,
        role: currentUserValue.data?.role,
        status: currentUserValue.data?.status,
        groupRole: "Group Admin",
      },
      ...mappedMembers,
    ];
    formData.categories = mappedCategories;

    delete formData.initialMembers;

    console.log(formData);
    const response = createGroupFn(formData);

    if (response) {
      console.log("CREATEDFUCKER");
    }
  }

  function iterateSavedData() {
    for (const key in savedForm) {
      if (key === "categories") {
        for (const category in savedForm[key]) {
          form.setFieldValue(
            `categories.${category}`,
            savedForm[key][category]
          );
        }
      } else {
        form.setFieldValue(key, savedForm[key]);
      }
    }
  }

  useEffect(() => {
    if (savedForm) {
      iterateSavedData();
    }
  }, [savedForm]);

  return (
    <Paper>
      <GroupControlCard
        header={header}
        button={button}
        enums={{ users: usersEnum }}
        form={{ form, onSubmit: formSubmit }}
        onPhotoControlClick={handleAddPhotoClick}
      />
    </Paper>
  );
}

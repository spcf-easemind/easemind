import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/GroupControlCard";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { useEnumsStore } from "../../store/enums";
import { useAuthenticationStore } from "../../store/authentication";
import { useFormStore } from "../../store/form";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api";
import { set } from "date-fns";

const header = {
  title: "Edit Group",
  description:
    "Create a group to connect with others, share experiences, and build a supportive community where everyone can grow and thrive together.",
};

const button = {
  btnLabel: "Save Changes",
};

export default function EditGroupPage() {
  const { ownedGroupRef } = useParams();

  // Zustand
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const { ownedGroup, fetchOwnedGroupFn } = useGroupAPIStore(
    useShallow((state) => ({
      ownedGroup: state.ownedGroup,
      fetchOwnedGroupFn: state.fetchOwnedGroup,
    }))
  );

  const { fetchUsersFn, users } = useEnumsStore(
    useShallow((state) => ({
      fetchUsersFn: state.fetchUsersEnum,
      users: state.users,
    }))
  );

  useEffect(() => {
    async function fetch() {
      await fetchUsersFn();
      await fetchOwnedGroupFn(ownedGroupRef);

      // Proceed to Initialization
      formInitialize();
    }
    fetch();
  }, []);

  const usersEnum = useMemo(() => {
    const groupMembers = ownedGroup?.members.map(({ key }) => key) || [];
    if (users.length > 0) {
      return users
        .filter(({ key }) => !groupMembers.includes(key))
        .map((user) => ({
          id: user.key,
          name: user.data.fullName,
          image: user.data?.profileImageUrl,
        }));
    }
    return [];
  }, [users, ownedGroup]);

  const { savedForm, setSavedForm } = useFormStore(
    useShallow((state) => ({
      savedForm: state.form,
      setSavedForm: state.setForm,
    }))
  );

  useEffect(() => {
    if (savedForm) {
      iterateSavedData();
    }
  }, [savedForm]);

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
          min: 2,
        },
        "Please select at least 2 members"
      ),
    },
  });

  function formInitialize() {
    const { owner, groupImageUrl, name, description, categories } = ownedGroup;

    const mappedCategories = categories.map(({ key, data }) => ({
      key,
      tab: data.category,
      value: data.name,
    }));

    const initValues = {
      ownerKey: owner.key,
      groupProfilePath: groupImageUrl,
      name,
      description,
      members: [],
      categories: [],

      // Initial Values
      initialMembers: [],
      initialCategories: mappedCategories,
    };

    console.log("initialize", initValues);
    form.initialize(initValues);
  }

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

  // Reroutes
  function handleChangePhotoClick() {
    setSavedForm(form.getValues());
    navigate("/owned-group/change-photo");
  }

  console.log(form.getValues());

  return (
    <Paper>
      <GroupControlCard
        enums={{ users: usersEnum }}
        header={header}
        button={button}
        form={{ form, onSubmit: formSubmit }}
        onPhotoControlClick={handleChangePhotoClick}
      />
    </Paper>
  );
}

import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/groups/GroupControlCard";
import { useForm, isNotEmpty } from "@mantine/form";
import { useEnumsStore } from "../../store/enums";
import { useAuthenticationStore } from "../../store/authentication";
import { useFormStore } from "../../store/form";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGroupAPIStore } from "../../store/group-api";
import { notificationsFn } from "../../utils/notifications";
import { useNavigate } from "react-router-dom";

const header = {
  title: "Edit Group",
  description:
    "Create a group to connect with others, share experiences, and build a supportive community where everyone can grow and thrive together.",
};

const button = {
  btnLabel: "Save Changes",
};

export default function EditGroupPage() {
  const navigate = useNavigate();
  const { ownedGroupRef } = useParams();

  // Zustand
  const loggedInUserKey = useAuthenticationStore(
    (state) => state.user.data?.key
  );

  const { ownedGroup, fetchOwnedGroupFn, updateGroupFn } = useGroupAPIStore(
    useShallow((state) => ({
      ownedGroup: state.ownedGroup,
      fetchOwnedGroupFn: state.fetchOwnedGroup,
      updateGroupFn: state.updateGroup,
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
      await fetchOwnedGroupFn(loggedInUserKey, ownedGroupRef);
    }
    fetch();
  }, []);

  useEffect(() => {
    if (ownedGroup) {
      formInitialize();
    }
  }, [ownedGroup]);

  const usersEnum = useMemo(() => {
    const groupMembers = ownedGroup
      ? ownedGroup.groupInfo?.members.map(({ key }) => key)
      : [];
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
    },
  });

  function formInitialize() {
    const { owner, groupImageUrl, name, description, categories } =
      ownedGroup.groupInfo;

    const mappedCategories = categories.map(({ key, data }) => ({
      tab: data.category,
      key,
      value: data.name,
    }));

    const initValues = {
      groupKey: "",
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

    form.initialize(initValues);
  }

  async function formSubmit(value) {
    let formData = { ...value };

    let updatedFormData = {
      groupKey: ownedGroupRef,
      updatedGroupInfo: {
        ownerKey: formData.ownerKey,
        groupProfilePath: formData.groupProfilePath,
        name: formData.name,
        description: formData.description,
        categories: [],
        newAddedMembers: [],
      },
    };

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
    updatedFormData.updatedGroupInfo.newAddedMembers = [...mappedMembers];
    updatedFormData.updatedGroupInfo.categories = mappedCategories;

    const id = notificationsFn.load();
    const response = await updateGroupFn(updatedFormData);

    if (response.type === "success") {
      notificationsFn.success(id, response.message);
      navigate(`/owned-group/${ownedGroupRef}`);
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

  // Reroutes
  function handleChangePhotoClick() {
    setSavedForm(form.getValues());
    navigate("/owned-group/change-photo");
  }

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

import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/GroupControlCard";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useEnumsStore } from "../../store/enums";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useAuthenticationStore } from "../../store/authentication";

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
  const { fetchUsersFn, users } = useEnumsStore(
    useShallow((state) => ({
      fetchUsersFn: state.fetchUsersEnum,
      users: state.users,
    }))
  );

  useEffect(() => {
    fetchUsersFn();
  }, []);

  console.log(users);

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
    navigate("/owned-group/add-photo");
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      ownerKey: loggedInUserKey,
      groupProfilePath: "",
      name: "",
      categories: [],
      members: [
        {
          fullName: currentUserValue.data.fullName,
          key: currentUserValue.key,
          lastUpdated: currentUserValue.data.lastUpdated,
          role: "super-admin",
          status: "online",
          groupRole: "Group Admin",
        },
      ],
      description: "",
      thoughts: "",
      emotions: "",
      members: "",
    },
  });

  return (
    <Paper>
      <GroupControlCard
        header={header}
        button={button}
        enums={{ users: usersEnum }}
        form={form}
        onPhotoControlClick={handleAddPhotoClick}
      />
    </Paper>
  );
}

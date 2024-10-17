import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/GroupControlCard";
import { useForm } from "@mantine/form";

const header = {
  title: "Edit Group",
  description:
    "Create a group to connect with others, share experiences, and build a supportive community where everyone can grow and thrive together.",
};

const button = {
  btnLabel: "Save Changes",
};

export default function EditGroupPage() {
  function handleChangePhotoClick() {
    navigate("/owned-group/change-photo");
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
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
        form={form}
        onPhotoControlClick={handleChangePhotoClick}
      />
    </Paper>
  );
}

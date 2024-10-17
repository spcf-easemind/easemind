import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/GroupControlCard";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

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

  function handleAddPhotoClick() {
    navigate("/owned-group/add-photo");
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
        onPhotoControlClick={handleAddPhotoClick}
      />
    </Paper>
  );
}

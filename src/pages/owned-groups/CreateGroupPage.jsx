import { Paper } from "@mantine/core";
import GroupControlCard from "../../components/cards/GroupControlCard";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

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
      <GroupControlCard form={form} onPhotoControlClick={handleAddPhotoClick} />
    </Paper>
  );
}

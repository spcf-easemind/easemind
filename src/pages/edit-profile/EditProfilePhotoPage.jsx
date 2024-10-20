import { Card } from "@mantine/core";
import { useEnumsStore } from "../../store/enums";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import PhotoControlCard from "../../components/cards/PhotoControlCard";
import { useFormStore } from "../../store/form";
import { useNavigate } from "react-router-dom";

export default function EditProfilePhotoPage() {
  const navigate = useNavigate();
  const { fetchGroupProfilesEnumFn, groupImages } = useEnumsStore(
    useShallow((state) => ({
      fetchGroupProfilesEnumFn: state.fetchGroupProfilesEnum,
      groupImages: state.groupImages,
    }))
  );

  useEffect(() => {
    fetchGroupProfilesEnumFn();
  }, []);

  const { savedForm, setSavedForm } = useFormStore(
    useShallow((state) => ({
      savedForm: state.form,
      setSavedForm: state.setForm,
    }))
  );

  function handleImageSubmit(image) {
    setSavedForm({ profileImageUrl: image });
    navigate("/edit-profile");
  }

  const imageValue = useMemo(() => {
    if (savedForm && savedForm.groupProfilePath) {
      return savedForm.groupProfilePath;
    }
    return null;
  }, [savedForm]);

  const groupProfilesEnum = useMemo(() => {
    return groupImages.map((image) => ({
      key: image.name,
      value: image.groupProfileImagePath,
    }));
  }, [groupImages]);
  return (
    <Card
      px={20}
      py={28}
      mx="auto"
      bg="gray.0"
      withBorder
      radius="md"
      maw={800}
    >
      <PhotoControlCard
        state={imageValue}
        onSubmit={handleImageSubmit}
        images={groupProfilesEnum}
      />
    </Card>
  );
}

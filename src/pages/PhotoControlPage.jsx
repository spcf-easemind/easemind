import { Paper } from "@mantine/core";
import PhotoControlCard from "../components/cards/PhotoControlCard";
import { useEnumsStore } from "../store/enums";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "../store/form";

export default function PhotoControlPage() {
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
    setSavedForm({ groupProfilePath: image });
    navigate("/owned-group/create");
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
    <Paper>
      <PhotoControlCard
        state={imageValue}
        onSubmit={handleImageSubmit}
        images={groupProfilesEnum}
      />
    </Paper>
  );
}

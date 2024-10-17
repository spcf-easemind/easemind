import { Paper } from "@mantine/core";
import PhotoControlCard from "../components/cards/PhotoControlCard";
import { useEnumsStore } from "../store/enums";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";

export default function PhotoControlPage() {
  const { fetchGroupProfilesEnumFn, groupImages } = useEnumsStore(
    useShallow((state) => ({
      fetchGroupProfilesEnumFn: state.fetchGroupProfilesEnum,
      groupImages: state.groupImages,
    }))
  );
  useEffect(() => {
    fetchGroupProfilesEnumFn();
  }, []);

  const groupProfilesEnum = useMemo(() => {
    return groupImages.map((image) => ({
      key: image.name,
      value: image.groupProfileImagePath,
    }));
  }, [groupImages]);
  return (
    <Paper>
      <PhotoControlCard images={groupProfilesEnum} />
    </Paper>
  );
}

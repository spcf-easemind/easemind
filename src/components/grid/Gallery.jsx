import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";
// import { Grid, Image } from "@mantine/core";
import classes from "./Gallery.module.css";

export default function Gallery({ children }) {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <LightGallery
      onInit={onInit}
      plugins={[lgVideo]}
      speed={500}
      elementClassNames={classes.lightGalleryGrid}
    >
      {children}
    </LightGallery>
  );
}

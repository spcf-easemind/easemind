import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import classes from "./Gallery.module.css";

export default function Gallery({ children }) {
  return (
    <LightGallery
      plugins={[lgVideo, lgThumbnail]}
      speed={500}
      elementClassNames={classes.lightGalleryGrid}
      licenseKey="0000-0000-000-0000"
    >
      {children}
    </LightGallery>
  );
}

import classes from "./PhotoList.module.css";

export default function PhotoList({ images }) {
  console.log(images);
  const ColInstance = images.map((image) => (
    <a href={image.fileURL} key={image.id}>
      <img
        src={image.fileURL}
        alt={`Image Uploaded-${image.id}`}
        className={classes.image}
      />
    </a>
  ));
  return ColInstance;
}

import classes from "./PhotoList.module.css";

export default function PhotoList({ images }) {
  const ColInstance = images.map((image) => (
    <a href={image.image}>
      <img src={image.image} alt="image sample" className={classes.image} />
    </a>
  ));
  return ColInstance;
}

import { Card, Image } from "@mantine/core";
import classes from "./CardButton.module.css";

export default function CardButton({ image, alt, value, onClick }) {
  function handleClick(value) {
    onClick(value);
  }

  return (
    <Card
      radius="lg"
      component="button"
      className={classes.card}
      onClick={(event) => {
        event.preventDefault();
        handleClick(value);
      }}
    >
      <Image src={image} alt={alt} className={classes.image} />
    </Card>
  );
}

import { Card, Image } from "@mantine/core";
import { useHover } from "@mantine/hooks";

export default function CardButton({ image, alt, value, onClick }) {
  const { hovered, ref } = useHover();

  function handleClick(value) {
    onClick(value);
  }

  return (
    <Card
      padding="xl"
      maw="200"
      radius="lg"
      component="button"
      style={{ border: "none", cursor: "pointer" }}
      bg={hovered ? "gray.0" : "white"}
      onClick={(event) => {
        event.preventDefault();
        handleClick(value);
      }}
      ref={ref}
    >
      <Image w={50} src={image} alt={alt} />
    </Card>
  );
}

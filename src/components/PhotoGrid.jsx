import { Grid, Image } from "@mantine/core";

export default function PhotoGrid({ images }) {
  const ColInstance = images.map((image) => (
    <Grid.Col span={6} key={image.image}>
      <Image src={image.image} radius="lg" />
    </Grid.Col>
  ));
  return <Grid>{ColInstance}</Grid>;
}

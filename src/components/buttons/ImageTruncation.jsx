import {
  Image,
  Group,
  Text,
  Overlay,
  Box,
  UnstyledButton,
} from "@mantine/core";
import classes from "./ImageTruncation.module.css";

const MAX_VISIBLE_IMAGES = 4;

export default function ImageTruncation({ images }) {
  const renderImages = () => {
    const visibleImages = images.slice(0, MAX_VISIBLE_IMAGES);

    return visibleImages.map((src, index) => (
      <Box
        className={classes.button}
        key={index}
        style={{
          zIndex: index,
          transform: `translateX(${index * 30}px)`, // Shift images horizontally
        }}
      >
        <Image src={src} alt={`Image ${index}`} className={classes.image} />

        {index === MAX_VISIBLE_IMAGES - 1 &&
          images.length > MAX_VISIBLE_IMAGES && (
            <Overlay className={classes.overlay}>
              <Text className={classes.text}>
                +{images.length - MAX_VISIBLE_IMAGES}
              </Text>
            </Overlay>
          )}
      </Box>
    ));
  };

  return (
    <UnstyledButton>
      <Group className={classes.parent}>{renderImages()}</Group>
    </UnstyledButton>
  );
}

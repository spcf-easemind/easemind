import { Anchor, Grid, Group, Image, Overlay } from "@mantine/core";
import classes from "./VideoList.module.css";

import { IconPlayerPlayFilled } from "@tabler/icons-react";
export default function VideoList({ videos }) {
  const ColInstance = videos.map((video) => (
    <Grid.Col span={6} key={video.id} data-sub-html={video.fileName}>
      <Anchor
        href={video.fileURL}
        target="_blank"
        underline="never"
        className={classes.anchorStyling}
      >
        <Image
          h={150}
          radius="lg"
          src={video.thumbnailURL}
          alt={`${video.fileName}`}
        />

        <Overlay radius="lg" className={classes.overlayStyling}>
          <Group justify="center" align="center" h="100%">
            <IconPlayerPlayFilled color="white" size={40} stroke={1.5} />
          </Group>
        </Overlay>
      </Anchor>
    </Grid.Col>
  ));
  return <Grid>{ColInstance}</Grid>;
}

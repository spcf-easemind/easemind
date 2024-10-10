import { Grid, AspectRatio } from "@mantine/core";

export default function VideoGrid() {
  return (
    <Grid>
      <Grid.Col span={6}>
        <AspectRatio>
          <iframe
            src="https://www.youtube.com/embed/PCphrHj-Teg"
            title="Z ft. Fetty Wap - Nobody&#39;s Better (Muffin Remix)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            style={{ border: 0, borderRadius: 10 }}
            showinfo="0"
            controls="0"
            autohide="1"
          ></iframe>
        </AspectRatio>
      </Grid.Col>
    </Grid>
  );
}

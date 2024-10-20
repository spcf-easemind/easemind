import { Box, Title, Stack } from "@mantine/core";
import PostCard from "../cards/posts/PostCard";
export default function RecommendedSection() {
  return (
    <>
      <Box mt={18}>
        <Stack>
          <PostCard type="recommended" />
        </Stack>
      </Box>
    </>
  );
}

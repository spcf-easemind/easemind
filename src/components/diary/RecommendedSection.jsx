import { Box, Title, Stack } from "@mantine/core";
import PostCard from "../cards/PostCard";
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

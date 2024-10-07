import { Card, Box, Image } from "@mantine/core"
import IconManyPeopleTwo from "../../assets/icons/IconManyPeopleTwo.svg"


export default function UserButton() {
  return (
    <Box>
      <Card padding="xl" radius="lg">
        <Image w={50} src={IconManyPeopleTwo} alt="Icon Many People" />
      </Card>
    </Box>
  )
}
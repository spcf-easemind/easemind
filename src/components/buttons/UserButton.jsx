import { Card, Image } from "@mantine/core";
import IconManyPeopleTwo from "../../assets/icons/IconManyPeopleTwo.svg";

export default function UserButton() {
  return (
    <Card padding="xl" maw="200" radius="lg">
      <Image w={50} src={IconManyPeopleTwo} alt="Icon Many People" />
    </Card>
  );
}

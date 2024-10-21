import {
  Box,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Divider,
  Stack,
} from "@mantine/core";


import AlexanderCamaddo from "../../assets/images/landing_page/team/alex_camaddo.png";
import GabrielGatbonton from "../../assets/images/landing_page/team/gabriel_gatbonton.png";
import TracyTolentino from "../../assets/images/landing_page/team/tracy_tolentino.png";
import RhymesesCortez from "../../assets/images/landing_page/team/rhymeses_cortez.png";

export default function GalleryTeamSection() {
  return (
    <>
      <Box pb={130}>
        <Box mb={50}>
          <Title
            order={1}
            mb={16}
            c="var(--mantine-color-dark-7)"
            align="center"
          >
            Team
          </Title>
          <Divider
            style={{ width: "175px", margin: "0 auto" }}
            size="md"
            color="var(--mantine-color-blue-8)"
          />
          <Text py={20} align="center">
            Meet the amazing and brilliant team that made EaseMind into a
            reality.
          </Text>
        </Box>

        <SimpleGrid cols={4}>
          <Card shadow="xl" p={20} radius="md">
            <Card.Section>
              <Image src={AlexanderCamaddo} />
            </Card.Section>
            <Title align="center" order={5} mt={10}>
              Alexander John M. Cammado
            </Title>
            <Text align="center" size="sm" c="var(--mantine-color-gray-8)">
              BackEnd Developer
            </Text>
          </Card>
          <Card shadow="xl" p={20}>
            <Card.Section>
              <Image src={GabrielGatbonton} />
            </Card.Section>
            <Title align="center" order={5} mt={10}>
              Gabriel Alfonso M. Gatbonton
            </Title>
            <Text align="center" size="sm" c="var(--mantine-color-gray-8)">
              Lead FrontEnd Developer
            </Text>
          </Card>
          <Card shadow="xl" p={20}>
            <Card.Section>
              <Image src={TracyTolentino} />
            </Card.Section>
            <Title align="center" order={5} mt={10}>
              Tracy Chiel Brandy H. Tolentino
            </Title>
            <Text align="center" size="sm" c="var(--mantine-color-gray-8)">
              UI/UX Designer
            </Text>
          </Card>
          <Card shadow="xl" p={20}>
            <Card.Section>
              <Image src={RhymesesCortez} />
            </Card.Section>
            <Title align="center" order={5} mt={10}>
              Rhymeses E. Cortez
            </Title>
            <Text align="center" size="sm" c="var(--mantine-color-gray-8)">
              FrontEnd Developer
            </Text>
          </Card>
        </SimpleGrid>
      </Box>
    </>
  );
}

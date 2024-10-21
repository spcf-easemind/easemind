import {
  Group,
  Box,
  Title,
  Image,
  Stack,
  Text,
  Card,
  SimpleGrid,
  Flex,
  Divider,
  ThemeIcon,
} from "@mantine/core";


import PicturePlaceholder from "../../assets/images/background_images/LandingPage-bg.jpg";
import IconQualityService from "../../assets/images/landing_page/icons/quality_service.png";
import IconUserPrivacy from "../../assets/images/landing_page/icons/user_privacy.png";
import IconIndividualNeeds from "../../assets/images/landing_page/icons/individual_needs.png";
import IconStigma from "../../assets/images/landing_page/icons/stigma.png";
import IconBenefits from "../../assets/images/landing_page/icons/benefits.png";
import IconInadequate from "../../assets/images/landing_page/icons/inadequate.png";
import IconIncrease from "../../assets/images/landing_page/icons/increase.png";
import IconSupression from "../../assets/images/landing_page/icons/supression.png";
import IconUnproductive from "../../assets/images/landing_page/icons/unproductive.png";

export default function AboutSection() {
  return (
    <>
      <Flex gap={24} pt={50} direction="row">
        <Box>
          <Title order={1} py={10} c="var(--mantine-color-dark-8)">
            About Us
          </Title>
          <Text pr={16} style={{ textAlign: "justify" }}>
            EaseMind is a student-led initiative in partnership with the ICP
            Hackathon, dedicated to providing accessible and supportive mental
            health services for those in need. Our mission is to create a
            secure, anonymous, and inclusive environment where users can find
            the mental health support they need through meaningful connections
            and resources. EaseMind is committed to achieving the following
            goals:
          </Text>
          <Stack gap="lg" py="lg">
            <Group wrap="no-wrap" align="center">
              <Image src={IconQualityService} w={80} h={70} />
              <Title order={4} pr={16} style={{ textAlign: "justify" }}>
                Deliver effective mental health support through meaningful
                conversations, tools, and resources.
              </Title>
            </Group>
            <Group wrap="no-wrap" align="center">
              <Image src={IconUserPrivacy} w={80} h={70} />
              <Title order={4} pr={16} style={{ textAlign: "justify" }}>
                Empower users with control over their privacy, ensuring a safe
                and inclusive environment for everyone.
              </Title>
            </Group>
            <Group wrap="no-wrap" align="center">
              <Image src={IconIndividualNeeds} w={75} h={65} />
              <Title order={4} pr={16} style={{ textAlign: "justify" }}>
                Promote mental well-being by offering personalized features that
                adapt to individual needs.
              </Title>
            </Group>
          </Stack>
        </Box>
        <Image src={PicturePlaceholder} h={450} w={550} radius="md" />
      </Flex>

      <Box py={130}>
        <Box mb={75}>
          <Title
            order={1}
            mb={16}
            c="var(--mantine-color-dark-7)"
            style={{ textAlign: "center" }}
          >
            Why did we create EaseMind?
          </Title>
          <Divider
            style={{ width: "175px", margin: "0 auto" }}
            size="md"
            color="var(--mantine-color-blue-8)"
          />
        </Box>
        <Group>
          <SimpleGrid cols={3} verticalSpacing={75}>
            <Card
              withBorder
              style={{ position: "relative", overflow: "visible", paddingTop: "50px" }}
            >
              <Flex justify="center">
                <ThemeIcon
                  radius="xl"
                  size={70}
                  style={{ position: "absolute", top: "-40px" }}
                >
                  <Image src={IconIncrease} w={45} />
                </ThemeIcon>
              </Flex>
              <Stack p={15}>
                <Title order={3} style={{ textAlign: "center" }}>
                  Increasing Mental Disorder Cases
                </Title>
                <Text size="sm" style={{ textAlign: "center" }}>
                  The number of Filipinos with mental disorders rose from 7.0 to
                  12.5 million between 1990 and 2019, with an average annual
                  increase of 2.0%.
                </Text>
              </Stack>
            </Card>
            <Card
              withBorder
              style={{ position: "relative", overflow: "visible", paddingTop: "50px" }}
            >
              <Flex justify="center">
                <ThemeIcon
                  radius="xl"
                  size={70}
                  style={{ position: "absolute", top: "-40px" }}
                >
                  <Image src={IconStigma} w={45} />
                </ThemeIcon>
              </Flex>
              <Stack p={15}>
                <Title order={3} style={{ textAlign: "center" }}>
                  Stigma Towards Mental Health
                </Title>
                <Text size="sm" style={{ textAlign: "center" }}>
                  Cultural stigma often attributes mental disorders to personal
                  flaws or supernatural forces, leading to social rejection.
                </Text>
              </Stack>
            </Card>
            <Card
              withBorder
              style={{ position: "relative", overflow: "visible", paddingTop: "45px" }}
            >
              <Flex justify="center">
                <ThemeIcon
                  radius="xl"
                  size={70}
                  style={{ position: "absolute", top: "-40px" }}
                >
                  <Image src={IconInadequate} w={45} />
                </ThemeIcon>
              </Flex>
              <Stack p={15}>
                <Title order={3} style={{ textAlign: "center" }}>
                  Inadequate Services
                </Title>
                <Text size="sm" style={{ textAlign: "center" }}>
                  The Philippines faces a critical shortage of mental health
                  resources, with only 7.76 hospital beds and 0.41 psychiatrists
                  available per 100,000 people.
                </Text>
              </Stack>
            </Card>
            <Card
              withBorder
              style={{ position: "relative", overflow: "visible", paddingTop: "50px" }}
            >
              <Flex justify="center">
                <ThemeIcon
                  radius="xl"
                  size={70}
                  style={{ position: "absolute", top: "-40px" }}
                >
                  <Image src={IconBenefits} w={45} />
                </ThemeIcon>
              </Flex>
              <Stack p={15}>
                <Title order={3} style={{ textAlign: "center" }}>
                  Benefits of Venting Out
                </Title>
                <Text size="sm" style={{ textAlign: "center" }}>
                  Venting can have positive health benefits, such as reducing
                  stress, improving sleep, and boosting the immune system. It
                  can also aid in recovery from traumatic experiences.
                </Text>
              </Stack>
            </Card>
            <Card
              withBorder
              style={{ position: "relative", overflow: "visible", paddingTop: "50px" }}
            >
              <Flex justify="center">
                <ThemeIcon
                  radius="xl"
                  size={70}
                  style={{ position: "absolute", top: "-40px" }}
                >
                  <Image src={IconUnproductive} w={45} />
                </ThemeIcon>
              </Flex>
              <Stack p={15}>
                <Title order={3} style={{ textAlign: "center" }}>
                  Unproductive Venting Out
                </Title>
                <Text size="sm" style={{ textAlign: "center" }}>
                  Venting to a dismissive listener can be harmful, as it can
                  invalidate feelings and damage self-esteem. Similarly, venting
                  to someone who amplifies negativity can lead to a downward
                  spiral.
                </Text>
              </Stack>
            </Card>
            <Card
              withBorder
              style={{ position: "relative", overflow: "visible", paddingTop: "60px" }}
            >
              <Flex justify="center">
                <ThemeIcon
                  radius="xl"
                  size={70}
                  style={{ position: "absolute", top: "-40px" }}
                >
                  <Image src={IconSupression} w={45} />
                </ThemeIcon>
              </Flex>
              <Stack p={15}>
                <Title order={3} style={{ textAlign: "center" }}>
                  Emotional Supression
                </Title>
                <Text size="sm" style={{ textAlign: "center" }}>
                  While research identifies numerous emotional experiences, we
                  often don't fully express them. Instead, we frequently
                  suppress, modify, or downplay our feelings.
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Group>
      </Box>
    </>
  );
}

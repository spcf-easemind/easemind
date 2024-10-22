import {
  Group,
  Box,
  Title,
  Image,
  Text,
  Card,
  SimpleGrid,
  List,
  Divider,
  Stack,
} from "@mantine/core";

import PicturePlaceholder from "../../assets/images/background_images/LandingPage-bg.jpg";
import AnonymousImage from "../../assets/images/landing_page/anonymous.jpg";
import ConsentImage from "../../assets/images/landing_page/consent.jpg";
import SecureImage from "../../assets/images/landing_page/secure-message.jpg";
import DigitalDiary from "../../assets/landing/DigitalDiary.png";
import OneOnOneChat from "../../assets/landing/OneOnOneChat.png";
import OpenForum from "../../assets/landing/OpenForum.png";


export default function FeaturesServicesSection() {
  return (
    <>
      <Box id="features" pb={130}>
        <Box mb={50}>
          <Title
            order={1}
            mb={16}
            c="var(--mantine-color-dark-8)"
            style={{ textAlign: "center" }}
          >
            Features
          </Title>
          <Divider
            style={{ width: "175px", margin: "0 auto" }}
            size="md"
            color="var(--mantine-color-blue-7)"
          />
          <Text py={20} align="center">
            Experience the therapeutic benefits of sharing your feelings openly
            and honestly in a supportive and non-judgmental space.
          </Text>
        </Box>
        <Group>
          <SimpleGrid cols={3}>
            <Card shadow="xl" radius={15}>
              <Card.Section>
                <Image src={ConsentImage} />
              </Card.Section>
              <Stack>
                <Title order={3} align="center" mt={10}>
                  User Consent
                </Title>
                <Text align="center" size="sm">
                  Ensures transparency by providing detailed information about
                  the services offered, the processes involved, and data privacy
                  practices. Users also maintain control over the specific data
                  shared with other users.
                </Text>
              </Stack>
            </Card>
            <Card shadow="xl" radius={15}>
              <Card.Section>
                <Image src={SecureImage} />
              </Card.Section>
              <Stack>
                <Title order={3} align="center" mt={10}>
                  Secure Messaging
                </Title>
                <Text align="center" size="sm">
                  To protect sensitive information, messages are strictly
                  confidential and can only be accessed by the individuals
                  involved in the conversation.
                </Text>
              </Stack>
            </Card>
            <Card shadow="xl" radius={15}>
              <Card.Section>
                <Image src={AnonymousImage} />
              </Card.Section>
              <Stack>
                <Title order={3} align="center" mt={10}>
                  Anonymous Mode
                </Title>
                <Text align="center" size="sm">
                  Users may engage in anonymous interactions, concealing their
                  identities from others.
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Group>
      </Box>

      <Box id="services" pb={130}>
        <Box mb={50}>
          <Title
            order={1}
            mb={16}
            c="var(--mantine-color-dark-7)"
            style={{ textAlign: "center" }}
          >
            Services
          </Title>
          <Divider
            style={{ width: "175px", margin: "0 auto" }}
            size="md"
            color="var(--mantine-color-blue-8)"
          />
          <Text py={20} align="center">
            Explore essential tools to enhance mental health well-being.
            Featured services provide practical solutions for managing stress,
            anxiety, and other challenges.
          </Text>
        </Box>

        <Stack gap={100}>
          <Group wrap="no-wrap" gap={45}>
            <Image src={OneOnOneChat} w={500} h={500} radius="md" fit="contain" />
            <Stack>
              <Title order={2}>One-on-one and Support Group Chat Rooms</Title>
              <Text style={{ textAlign: "justify" }}>
                A community of like-minded individuals and compassionate
                volunteers awaits connection. Share thoughts and feelings in a
                secure, supportive environment. As an Ease Buddy, connect with
                Ease Companions or other Ease Buddies for tailored support and
                guidance.
              </Text>
              <List withPadding>
                <List.Item style={{ textAlign: "justify" }}>
                  Volunteer Support: Volunteers, possessing professional or
                  personal expertise, are empowered to share resources, and
                  engage in meaningful conversations to support users on their
                  mental health journey.
                </List.Item>
                <List.Item style={{ textAlign: "justify" }}>
                  Anonymous Mode: Easy Buddy can appear anonymously when talking
                  to someone, protecting their identity.
                </List.Item>
                <List.Item style={{ textAlign: "justify" }}>
                  Support Group Rooms: Fosters a sense of community and
                  belonging by enabling users to create, join, and manage
                  support groups where they can share their experiences, discuss
                  common struggles, and find support from like-minded
                  individuals.
                </List.Item>
              </List>
            </Stack>
          </Group>

          <Group wrap="no-wrap" gap={45}>
            <Stack>
              <Title order={2}>Digital Diary</Title>
              <Text style={{ textAlign: "justify" }}>
                Provides a safe and convenient space for Ease Buddy to freely
                express their thoughts and feelings by writing it. fostering a
                sense of emotional well-being.
              </Text>
              <List withPadding>
                <List.Item style={{ textAlign: "justify" }}>
                  Secured Diary Entries: A private journal space where users can
                  express their thoughts and emotions freely, knowing their
                  privacy is protected.
                </List.Item>
                <List.Item style={{ textAlign: "justify" }}>
                  Mental health resources: Tailored resources are suggested to
                  users upon completing their journal entries, reflecting their
                  current emotional state.
                </List.Item>
                <List.Item style={{ textAlign: "justify" }}>
                  Mood Tracker: An easy-to-use tool that helps users monitor
                  their emotional states and gain insights into their mental
                  health patterns.
                </List.Item>
                <List.Item style={{ textAlign: "justify" }}>
                  Daily Activity Assistance: Daily reminders and a taskboard
                  provide users with timely sentiment analysis and assistance in
                  managing their activities.
                </List.Item>
              </List>
            </Stack>
            <Image src={DigitalDiary} w={500} h={500} radius="md" fit="contain"/>
          </Group>

          <Group wrap="no-wrap" gap={45}>
            <Image src={OpenForum} w={500} h={500} radius="md" fit="contain" />
            <Stack>
              <Title order={2}>Open Wall Forum</Title>
              <Text style={{ textAlign: "justify" }}>
                Ease Companions provide uplifting messages and words of wisdom
                on the open wall forum, creating a positive and supportive
                atmosphere for users.
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Box>
    </>
  );
}

import {
  Group,
  Box,
  Title,
  Text,
  Paper,
  TextInput,
  Textarea,
  Button,
  Divider,
  Stack,
  Flex,
} from "@mantine/core";

export default function FAQContactSection() {
  return (
    <>
      <Box pb={150}>
        <Box mb={50}>
          <Title
            order={1}
            mb={16}
            c="var(--mantine-color-dark-7)"
            align="center"
          >
            Frequently Asked Questions
          </Title>
          <Divider
            style={{ width: "175px", margin: "0 auto" }}
            size="md"
            color="var(--mantine-color-blue-8)"
          />
          <Text py={20} align="center">
            Explore the FAQ section for answers to common questions.
          </Text>
        </Box>

        <Stack gap={25}>
          <Group wrap="no-wrap">
            <Title order={5} w={725}>
              Do you need to be in the medical field to be an Ease Companion?
            </Title>
            <Text align="justify">
              EaseMind is open to all individuals, regardless of their medical
              background, who are willing to offer comfort and guidance to Ease
              Buddies.
            </Text>
          </Group>

          <Divider />

          <Group wrap="no-wrap">
            <Title order={5} w={750}>
              Do all Ease Companions receive formal training in emotional
              support?
            </Title>
            <Text align="justify">
              While Ease Companions are not currently trained professionals,
              they undergo a careful selection process to ensure their
              suitability for the role.
            </Text>
          </Group>

          <Divider />

          <Group wrap="no-wrap">
            <Title order={5} w={1750}>
              How does EaseMind prioritize the security of Ease Buddy data?
            </Title>
            <Text align="justify">
              EaseMind leverages blockchain technology, a decentralized and
              immutable ledger, to safeguard Ease Buddy data. This robust system
              ensures data integrity and protection against unauthorized access
              or tampering. Additionally, strong encryption protocols and
              regular security audits further enhance data privacy and
              confidentiality.
            </Text>
          </Group>

          <Divider />

          <Group wrap="no-wrap">
            <Title order={5} w={2500}>
              Does EaseMind offer professional mental health consultations?
            </Title>
            <Text align="justify">
              EaseMind does not currently provide direct mental health
              consultations. While our platform offers tools for emotional
              expression and support from Ease Companions, it's important to
              note that Ease Companions, even those with medical backgrounds,
              are not authorized to offer professional mental health advice or
              consultations through EaseMind. For personalized guidance and
              treatment, we recommend seeking assistance from qualified mental
              health professionals.
            </Text>
          </Group>

          <Divider />

          <Group wrap="no-wrap">
            <Title order={5} w={2675}>
              Is my privacy fully protected when I activate anonymous mode?
            </Title>
            <Text align="justify">
              While anonymous mode is designed to provide a high degree of
              privacy, it's important to understand that no online platform can
              guarantee absolute anonymity. In certain circumstances, such as in
              response to legal requests or reports of harmful behavior, we may
              be required to access and review relevant data to comply with our
              legal obligations or protect the safety of our community. However,
              we prioritize user privacy and take robust measures to minimize
              the disclosure of personal information.
            </Text>
          </Group>
        </Stack>
      </Box>

      <Box pb={150} id="contact">
        <Box pb={50}>
          <Title
            order={1}
            mb={16}
            c="var(--mantine-color-dark-7)"
            align="center"
          >
            Contact
          </Title>
          <Divider
            style={{ width: "175px", margin: "0 auto" }}
            size="md"
            color="var(--mantine-color-blue-8)"
          />
          <Text py={20} align="center">
            Want to reach out? Find our contact information below.
          </Text>
        </Box>

        <Group justify="center">
          <Stack>
            <Paper shadow="xl" p={50}>
              <Text fw={500} align="center">
                Address
              </Text>
              <Text align="center">1985 Miranda St, Angeles, Pampanga</Text>
            </Paper>
            <Group>
              <Paper shadow="xl" p={25}>
                <Text fw={500} align="center">
                  Call Us
                </Text>
                <Text align="center">+63 111 111 1111</Text>
              </Paper>
              <Paper shadow="xl" p={25}>
                <Text fw={500} align="center">
                  Email Us
                </Text>
                <Text align="center">spcf.ictdu@spcf.edu.ph</Text>
              </Paper>
            </Group>
          </Stack>

          <Paper p={25} w={575} h={275} shadow="xl">
            <Stack gap={20} justify="center">
              <Group grow>
                <TextInput placeholder="Full name" />
                <TextInput placeholder="Email" />
              </Group>
              <TextInput placeholder="Subject" />
              <Textarea placeholder="Message" />
            </Stack>
            <Flex justify="center">
              <Button mt={25} radius="lg">
                Send Message
              </Button>
            </Flex>
          </Paper>
        </Group>
      </Box>
    </>
  );
}

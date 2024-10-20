import { Stack, Title, List, Text } from "@mantine/core";
import aboutUs from "../../static/about-us";

const boldKeywords = [
  "EaseMind",
  "Group and One-on-One Chat:",
  "Volunteer Support:",
  "Diary Entries:",
  "Mood Tracker:",
  "Anonymous Mode:",
];

function formatText(text) {
  const regex = new RegExp(`(${boldKeywords.join("|")})`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    boldKeywords.includes(part) ? (
      <Text component="span" fw={700} key={index}>
        {part}
      </Text>
    ) : (
      part
    )
  );
}

export default function AboutUs() {
  return (
    <>
      <Title mb={12} order={3}>
        {aboutUs.title}
      </Title>
      <Stack spacing="md">
        {aboutUs.content.map((section, index) => (
          <Stack key={index} spacing="sm">
            {/* Section Title */}
            {section.title && <Title order={5}>{section.title}</Title>}

            {/* Section Body */}
            {section.body && (
              <Text size="sm" lh={1.2}>
                {formatText(section.body)}
              </Text>
            )}

            {/* Section List if it exists */}
            {section.list && (
              <List withPadding>
                {section.list.map((item, i) => (
                  <List.Item key={i}>
                    <Text size="sm" lh={1.2}>
                      {formatText(item)}
                    </Text>
                  </List.Item>
                ))}
              </List>
            )}

            {/* Second body if present */}
            {section.secondBody && (
              <Text size="sm" lh={1.2}>
                {formatText(section.secondBody)}
              </Text>
            )}
          </Stack>
        ))}
      </Stack>
    </>
  );
}

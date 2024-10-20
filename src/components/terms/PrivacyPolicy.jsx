import { Stack, Title, List, Text } from "@mantine/core";
import privacyPolicy from "../../static/privacy-policy";

const boldKeywords = [
  "EaseMind",
  "Anonymous Mode",
  "18 and above",
  "Terms and Conditions",
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

export default function PrivacyPolicy() {
  return (
    <>
      <Title mb={12} order={3}>
        {privacyPolicy.title}
      </Title>
      <Stack spacing="md">
        {privacyPolicy.content.map((section, index) => (
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

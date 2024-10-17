import { Text } from "@mantine/core";
export default function TextValidation({ formError }) {
  const customValidation = formError ? formError : null;

  return (
    customValidation && (
      <Text size="sm" c="red.5">
        {customValidation}
      </Text>
    )
  );
}

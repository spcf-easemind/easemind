import { Checkbox, useMatches } from "@mantine/core";
export default function Questions({ boldLabel, label, props, onClick }) {
  function handleClick(value) {
    const timeout = setTimeout(() => {
      onClick(value);
    }, 1000);

    return () => clearTimeout(timeout);
  }

  const labelProp = (
    <>
      <strong>{boldLabel}:</strong> {label}
    </>
  );

  const checkboxSize = useMatches({
    base: "xs",
    sm: "sm",
    md: "md",
  })

  const checkboxInstance = (
    <Checkbox
      label={labelProp}
      radius="xl"
      c="white"
      size={checkboxSize}
      iconColor="sky-blue.6"
      color="white"
      {...props}
      onChange={() => {
        handleClick(boldLabel);
      }}
    ></Checkbox>
  );

  return checkboxInstance;
}

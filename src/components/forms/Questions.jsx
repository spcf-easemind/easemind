import { Checkbox } from "@mantine/core";
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

  const checkboxInstance = (
    <Checkbox
      label={labelProp}
      radius="xl"
      c="white"
      size="md"
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

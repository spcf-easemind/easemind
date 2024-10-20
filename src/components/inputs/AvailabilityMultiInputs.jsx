import { Title } from "@mantine/core";
import MultiInputsCard from "../cards/MultiInputsCard";
import AvailabilityCheckboxes from "../checkboxes/AvailabilityCheckboxes";

const title = "Availability";

export default function AvailabilityMultiInputs({ form: { form } }) {
  const header = <Title order={4}>{title}</Title>;

  return (
    <MultiInputsCard header={header}>
      <AvailabilityCheckboxes form={{ form }} />
    </MultiInputsCard>
  );
}

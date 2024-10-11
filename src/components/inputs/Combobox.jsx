import {
  Combobox as CustomBox,
  useCombobox,
  Pill,
  PillsInput,
  Group,
  CheckIcon,
} from "@mantine/core";
import { useState } from "react";

export default function Combobox({ data, value, onChange, ...props }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");

  const handleValueSelect = (val) =>
    onChange(
      value.includes(val) ? value.filter((v) => v !== val) : [...value, val]
    );

  const handleValueRemove = (val) => onChange(value.filter((v) => v !== val));

  // Pills
  const values = value.map((item) => (
    <Pill
      key={item}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
      styles={{
        root: {
          borderRadius: 5,
          backgroundColor: "var(--mantine-primary-color-5)",
          color: "white",
        },
      }}
    >
      {item}
    </Pill>
  ));

  // Edit Display Data
  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <CustomBox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </CustomBox.Option>
    ));

  return (
    <CustomBox store={combobox} onOptionSubmit={handleValueSelect}>
      <CustomBox.DropdownTarget>
        <PillsInput size="lg" onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <CustomBox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </CustomBox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </CustomBox.DropdownTarget>

      <CustomBox.Dropdown>
        <CustomBox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <CustomBox.Empty>Nothing found...</CustomBox.Empty>
          )}
        </CustomBox.Options>
      </CustomBox.Dropdown>
    </CustomBox>
  );
}

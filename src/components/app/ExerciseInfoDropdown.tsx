import { Icon } from "@iconify/react";
import { Stack, UnstyledButton, Group, Collapse, Text } from "@mantine/core";
import { useState } from "react";

type ExerciseDropdownInfoProps = {
  name: string;
  sets: Record<string, number>[];
  units: string[];
};

const ExerciseInfoDropdown = ({ name, sets, units }: ExerciseDropdownInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing="xs">
      <UnstyledButton
        p="xs"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[2] : theme.colors.gray[8],
          borderRadius: "3px",
        })}
        onClick={() => setOpen((o) => !o)}
      >
        <Group
          align={"center"}
          position={"apart"}
          sx={{
            "& .iconify.open": {
              transform: "rotate(45deg)",
            },
          }}
        >
          <Text>{name}</Text>
          <Icon icon="material-symbols:add" className={open ? "open" : ""} />
        </Group>
      </UnstyledButton>
      <Collapse px="xs" in={open} transitionDuration={80} transitionTimingFunction={"linear"}>
        <Group>
          <Stack>
            {units.map((unit) => (
              <Text key={`${name}-${unit}`} fw="bold" fz="sm">
                {unit}
              </Text>
            ))}
          </Stack>
          {sets.map((set, i) => {
            return (
              <Stack key={`${name}-set-${i}`}>
                {units.map((unit) => (
                  <Text key={`${name}-${unit}-set-${i}-val`}>{set[unit]}</Text>
                ))}
              </Stack>
            );
          })}
        </Group>
      </Collapse>
    </Stack>
  );
};

export default ExerciseInfoDropdown;

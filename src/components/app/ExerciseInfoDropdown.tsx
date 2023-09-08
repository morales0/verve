import { Icon } from "@iconify/react";
import { Stack, UnstyledButton, Group, Collapse, Text, Paper, Flex, Divider, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { SetType, WorkoutExercise } from "../../types/workout";

type ExerciseDropdownInfoProps = {
  name: string;
  sets: SetType[];
  units: string[];
};

const ExerciseInfoDropdown = ({ name, sets, units }: ExerciseDropdownInfoProps) => {
  const theme = useMantineTheme();
  const [open, setOpen] = useState(false);

  return (
    <Paper
      bg={theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.colors.gray[0]}
      p="xs"
      component={Stack}
      spacing="sm"
    >
      <UnstyledButton component={Flex} justify="space-between" align="center" onClick={() => setOpen((prev) => !prev)}>
        <Group align="center">
          <Text>{name}</Text>

          <Text color="dimmed" fz="sm">
            {sets.length} sets
          </Text>
        </Group>

        <Icon icon="carbon:chevron-down" />
      </UnstyledButton>
      <Collapse px="xs" in={open} transitionDuration={80} transitionTimingFunction={"linear"}>
        <Group pt="xs">
          <Stack>
            {units.map((unit) => (
              <Text key={`${name}-${unit}`} fw="bold" fz="sm">
                {unit}
              </Text>
            ))}
          </Stack>
          {sets.map(({ values }, i) =>
            values ? (
              <Stack key={`${name}-set-${i}`}>
                {units.map((unit) => (
                  <Text key={`${name}-${unit}-set-${i}-val`}>{values[unit]}</Text>
                ))}
              </Stack>
            ) : null
          )}
        </Group>
      </Collapse>
    </Paper>
  );
};

export default ExerciseInfoDropdown;

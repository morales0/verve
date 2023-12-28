import { Icon } from "@iconify/react";
import {
  Collapse,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { ExerciseSet } from "../../types/workout";

type ExerciseDropdownInfoProps = {
  name: string;
  sets: ExerciseSet[];
  units: string[];
};

const ExerciseInfoDropdown = ({ name, sets, units }: ExerciseDropdownInfoProps) => {
  const theme = useMantineTheme();
  const [open, setOpen] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  return (
    <Paper bg={colorScheme === "dark" ? theme.colors.gray[9] : theme.colors.gray[0]} p="xs" component={Stack} gap="sm">
      <UnstyledButton onClick={() => setOpen((prev) => !prev)}>
        <Group align="center">
          <Text>{name}</Text>

          <Text color="dimmed" fz="sm">
            {sets.length} sets
          </Text>
        </Group>

        <Icon
          icon="carbon:chevron-down"
          style={{ transition: "500ms", transform: `rotate(${open ? "180deg" : "0"})` }}
        />
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

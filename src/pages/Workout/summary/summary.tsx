import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import cx from "clsx";
import appClasses from "@/styles/app.module.css";
import useWorkout from "@/hooks/workout.hook";
import { getMuscleGroupSet } from "@/functions/data";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const navigate = useNavigate();
  const { workout, api } = useWorkout();

  const exercises = workout.exercises;
  const groups = Array.from(getMuscleGroupSet(exercises ?? []));

  return (
    <Stack className={cx(appClasses.heightLocked)} justify="space-between" h="100%" gap={0}>
      <Box p="xs">
        <Button w="100%" size="md" variant="light" color="cyan" onClick={() => navigate("/workout")}>
          <Group gap="sm" align="center">
            <Icon icon="fluent:add-28-filled" />
            Add Exercises
          </Group>
        </Button>
      </Box>

      <Stack className={cx(appClasses.scrollable)} gap="sm" px="xs" py="sm">
        {exercises?.map((ex, i) => (
          <Paper key={`summary-ex-${ex.id}`} withBorder py="xs" px="sm">
            <Stack gap="xs">
              <Flex justify="space-between" align="center">
                <Text fw="bold">{ex.name}</Text>
                <Flex wrap="nowrap" gap="xs" align="center">
                  <ActionIcon color="indigo" variant="light" onClick={() => console.log("edit")}>
                    <Icon icon="material-symbols:edit" />
                  </ActionIcon>

                  <ActionIcon color="red" variant="light" onClick={() => console.log("delete")}>
                    <Icon icon="ic:baseline-delete-forever" />
                  </ActionIcon>
                </Flex>
              </Flex>

              <Divider />
              <Flex styles={{ root: { overflowX: "auto" } }} gap="md">
                <Stack>
                  {ex.units.map((unit) => (
                    <Text key={`${ex.name}-${unit}`} fw="bold" fz="sm">
                      {unit}
                    </Text>
                  ))}
                </Stack>
                {ex.sets?.map(({ values }, i) => {
                  return (
                    <Stack key={`${ex.name}-set-${i}`}>
                      {ex.units.map((unit) => (
                        <Text key={`${ex.name}-${unit}-set-${i}-val`}>{values[unit]}</Text>
                      ))}
                    </Stack>
                  );
                })}
              </Flex>

              <Divider />
              <Flex gap="sm" pb="sm" styles={{ root: { overflow: "auto" } }}>
                {ex.primaryMuscleGroups?.concat(ex.secondaryMuscleGroups ?? []).map((g) => (
                  <Badge key={g} variant={"light"} color={"indigo"} styles={{ root: { flexShrink: 0 } }}>
                    {g}
                  </Badge>
                ))}
              </Flex>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Divider mt="auto" />
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button size="sm" variant="light" color="red">
          Cancel Workout
        </Button>
        <Button size="sm" variant="gradient" gradient={{ from: "teal", to: "blue", deg: 40 }}>
          <Text fw={500}>Complete</Text>
        </Button>
      </Group>
    </Stack>
  );
};

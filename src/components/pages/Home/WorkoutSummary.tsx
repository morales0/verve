import { Icon } from "@iconify/react";
import { Paper, Flex, Group, Divider, Stack, Badge, Text } from "@mantine/core";
import ExerciseInfoDropdown from "../../app/ExerciseInfoDropdown";
import { Link } from "react-router-dom";
import { WorkoutExercise, WorkoutHistory } from "../../../types/workout";
import { useEffect } from "react";

type Props = Pick<WorkoutHistory, "dateEnded" | "dateStarted" | "exercises"> & {
  current?: boolean;
};

export const WorkoutSummary = ({ exercises, dateStarted, dateEnded, current }: Props) => {
  const dateStartedObject = new Date(dateStarted ?? "");
  const displayDate = dateStartedObject.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const dayOfWeek = dateStartedObject.toLocaleDateString("en-US", { weekday: "long" }).split(",")[0];
  const dateEndedObject = dateEnded ? new Date(dateEnded) : new Date();
  const elapsedTime = dateEndedObject.getTime() - dateStartedObject.getTime();

  const minutes = Math.floor(elapsedTime / 60000); // 1 minute = 60000 milliseconds
  const seconds = Math.floor((elapsedTime % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  const getMuscleGroupSet = (exercises: WorkoutExercise[]) => {
    const set = new Set<string>();

    exercises.forEach((e) => {
      e.primaryMuscleGroups?.forEach((pg) => set.add(pg));
      e.secondaryMuscleGroups?.forEach((sg) => set.add(sg));
    });

    return set;
  };

  return (
    <Paper withBorder p="sm">
      <Flex justify="space-between" align="center">
        <Group spacing="xs">
          {current ? (
            <Link to="/workout">
              <Text color="teal.7" fw="500">
                Current Workout
              </Text>
            </Link>
          ) : (
            <Text span fw={500}>
              {dayOfWeek}
            </Text>
          )}
          <Text span color="dimmed" fz="sm">
            {displayDate}
          </Text>
        </Group>
        <Group spacing={5} align="center">
          <Icon icon="ic:outline-timer" />
          <Text fz="sm">
            {minutes}:{seconds}
          </Text>
        </Group>
      </Flex>
      <Divider my="xs" />
      <Stack spacing="xs">
        {exercises?.map((exercise, i) => (
          <ExerciseInfoDropdown
            key={exercise.id ?? exercise.name}
            name={exercise.name}
            sets={exercise.sets}
            units={exercise.units}
          />
        ))}
      </Stack>
      <Divider my="xs" />
      <Flex sx={{ overflow: "auto" }} gap="sm" pb="sm">
        {Array.from(getMuscleGroupSet(exercises ?? [])).map((g) => (
          <Badge
            key={g}
            variant={current ? "dot" : "light"}
            color={current ? "green" : "indigo"}
            sx={{ flexShrink: 0 }}
          >
            {g}
          </Badge>
        ))}
      </Flex>
    </Paper>
  );
};

export default WorkoutSummary;

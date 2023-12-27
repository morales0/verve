import { Icon } from "@iconify/react";
import { Badge, Divider, Flex, Group, Paper, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { Workout, WorkoutExercise, WorkoutHistory } from "@/types/workout";
import { ExerciseDropdown } from "./exercise-dropdown";
import { getMuscleGroupSet } from "@/functions/data";

function calcIsToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function calcIsYesterday(date: Date): boolean {
  const today: Date = new Date();
  const yesterday: Date = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

function figureOutExercises(exercises: Workout["exercises"]) {
  // if exercises is an array
  if (Array.isArray(exercises)) {
    return exercises as WorkoutExercise[];
  }
  // if exercises is an object
  return [...(exercises?.normal ?? []), ...(exercises?.circuits?.flat() ?? [])];
}

type WorkoutCardProps = Pick<WorkoutHistory, "dateEnded" | "dateStarted" | "exercises"> & {
  current?: boolean;
};

export const WorkoutCard = ({ exercises, dateStarted, dateEnded, current }: WorkoutCardProps) => {
  const { colorScheme } = useMantineColorScheme();

  const dateStartedObject = new Date(dateStarted ?? "");
  const isToday = calcIsToday(dateStartedObject);
  const isYesterday = calcIsYesterday(dateStartedObject);
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

  const flattenedExercises = figureOutExercises(exercises);
  const groups = Array.from(getMuscleGroupSet(flattenedExercises));

  return (
    <Paper withBorder p="sm">
      <Flex justify="space-between" align="center">
        <Group gap="xs">
          {current ? (
            <Link to="/workout">
              <Text c="teal.7" fw="500">
                Current Workout
              </Text>
            </Link>
          ) : (
            <Text span fw={500} c={isToday ? "indigo.6" : isYesterday ? "violet.5" : ""}>
              {isToday ? "Today" : isYesterday ? "Yesterday" : dayOfWeek}
            </Text>
          )}
          <Text span color="dimmed" fz="sm">
            {displayDate}
          </Text>
        </Group>
        <Group gap={5} align="center">
          <Icon icon="ic:outline-timer" />
          <Text fz="sm">
            {minutes}:{seconds}
          </Text>
        </Group>
      </Flex>
      <Divider my="xs" />
      <Stack gap="xs">
        {flattenedExercises?.map((exercise, i) => (
          <ExerciseDropdown
            key={exercise.id ?? exercise.name}
            name={exercise.name}
            sets={exercise.sets!}
            units={exercise.units}
          />
        )) ?? (
          <Text color="dimmed" fz="sm" styles={{ root: { alignSelf: "center" } }}>
            No exercises... yet!
          </Text>
        )}
      </Stack>
      <Divider my="xs" hidden={groups.length === 0} />
      <Flex gap="sm" pb="sm" styles={{ root: { overflow: "auto" } }}>
        {groups.map((g) => (
          <Badge
            key={g}
            variant={current ? "dot" : "light"}
            color={current ? "green" : "indigo"}
            styles={{ root: { flexShrink: 0 } }}
          >
            {g}
          </Badge>
        ))}
      </Flex>
    </Paper>
  );
};

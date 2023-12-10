import { Icon } from "@iconify/react";
import { Badge, Divider, Flex, Group, Paper, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { WorkoutExercise, WorkoutHistory } from "../../../types/workout";
import { ExerciseDropdown } from "./exercise-dropdown";

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

type Props = Pick<WorkoutHistory, "dateEnded" | "dateStarted" | "exercises"> & {
  current?: boolean;
};

export const WorkoutCard = ({ exercises, dateStarted, dateEnded, current }: Props) => {
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

  const getMuscleGroupSet = (exercises: WorkoutExercise[]) => {
    const set = new Set<string>();

    exercises.forEach((e) => {
      e.primaryMuscleGroups?.forEach((pg) => set.add(pg));
      e.secondaryMuscleGroups?.forEach((sg) => set.add(sg));
    });

    return set;
  };

  const groups = Array.from(getMuscleGroupSet(exercises ?? []));

  const todayBorderColor = current
    ? colorScheme === "dark"
      ? "teal.6"
      : "teal.8"
    : colorScheme === "dark"
      ? "indigo.4"
      : "indigo.8";

  return (
    <Paper
      withBorder
      p="sm"
      // sx={(theme) => ({
      //   borderColor: isToday ? theme.fn.themeColor(todayBorderColor) : "",
      //   boxShadow: isToday ? `0 0 4px 0 ${theme.fn.rgba(theme.fn.themeColor(todayBorderColor), 0.3)}` : "",
      // })}
    >
      <Flex justify="space-between" align="center">
        <Group gap="xs">
          {current ? (
            <Link to="/workout">
              <Text color="teal.7" fw="500">
                Current Workout
              </Text>
            </Link>
          ) : (
            <Text span fw={500} color={isToday ? "indigo.6" : isYesterday ? "violet.5" : ""}>
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
        {exercises?.map((exercise, i) => (
          <ExerciseDropdown
            key={exercise.id ?? exercise.name}
            name={exercise.name}
            sets={exercise.sets}
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

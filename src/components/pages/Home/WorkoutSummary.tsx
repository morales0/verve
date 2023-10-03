import { Icon } from "@iconify/react";
import { Badge, Divider, Flex, Group, Paper, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { WorkoutExercise, WorkoutHistory } from "../../../types/workout";
import ExerciseInfoDropdown from "../../app/ExerciseInfoDropdown";

function calcIsToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

type Props = Pick<WorkoutHistory, "dateEnded" | "dateStarted" | "exercises"> & {
  current?: boolean;
};

export const WorkoutSummary = ({ exercises, dateStarted, dateEnded, current }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const dateStartedObject = new Date(dateStarted ?? "");
  const isToday = calcIsToday(dateStartedObject);
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
      sx={(theme) => ({
        borderColor: isToday ? theme.fn.themeColor(todayBorderColor) : "",
        boxShadow: isToday ? `0 0 4px 0 ${theme.fn.rgba(theme.fn.themeColor(todayBorderColor), 0.3)}` : "",
      })}
    >
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
              {isToday ? "Today" : dayOfWeek}
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
        )) ?? (
          <Text color="dimmed" fz="sm" sx={{ alignSelf: "center" }}>
            No exercises... yet!
          </Text>
        )}
      </Stack>
      <Divider my="xs" hidden={groups.length === 0} />
      <Flex sx={{ overflow: "auto" }} gap="sm" pb="sm">
        {groups.map((g) => (
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

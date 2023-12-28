import { Icon } from "@iconify/react";
import { Badge, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import ExerciseInfoDropdown from "../../../components/app/ExerciseInfoDropdown";
import useWorkout from "../../../hooks/workout.hook";
import { WorkoutExercise } from "../../../types/workout";

const CurrentWorkoutSummary = () => {
  const { workout } = useWorkout();

  const getMuscleGroupSet = (exercises: WorkoutExercise[]) => {
    const set = new Set<string>();

    exercises.forEach((e) => {
      e.primaryMuscleGroups?.forEach((pg) => set.add(pg));
      e.secondaryMuscleGroups?.forEach((sg) => set.add(sg));
    });

    return set;
  };

  return (
    <Stack gap="sm">
      <Title order={3}>My Workout</Title>
      <Paper shadow="xs" radius="sm" p="lg" withBorder>
        <Stack gap="xs">
          <Link to="/workout">
            <Group position="left" align="baseline">
              <Text color="dimmed" size="xs" italic weight="bold">
                {new Date(workout.dateStarted || "").toDateString()} @ {workout.timeStarted}
              </Text>
              <Group ml="auto" align="center" gap={5} sx={{}}>
                <Text color="teal" italic>
                  Continue
                </Text>
                <Icon color="teal" icon="material-symbols:keyboard-arrow-right" />
              </Group>
            </Group>
          </Link>
          <Divider />
          <Group>
            {Array.from(getMuscleGroupSet(workout.exercises || [])).map((g) => (
              <Badge key={g} variant="dot" color="green">
                {g}
              </Badge>
            ))}
          </Group>
          <Group position="left" align="flex-start">
            {workout.exercises ? (
              workout.exercises.map((exercise, i) => (
                <ExerciseInfoDropdown
                  key={`exercise-${exercise.name}-${i}`}
                  name={exercise.name}
                  sets={exercise.sets}
                  units={exercise.units}
                />
              ))
            ) : (
              <Text color="dimmed" italic>
                No exercises yet
              </Text>
            )}
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default CurrentWorkoutSummary;

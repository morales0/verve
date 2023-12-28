import { Badge, Button, Card, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import ExerciseInfoDropdown from "../../../components/app/ExerciseInfoDropdown";
import useWorkoutHistory from "../../../hooks/workoutHistory.hook";
import { STATUS } from "../../../types/util";
import { WorkoutExercise } from "../../../types/workout";

type Props = {
  startNewWorkoutAndNavigate: () => Promise<void>;
  isWorkingOut: boolean;
};

const HistorySection = ({ startNewWorkoutAndNavigate, isWorkingOut }: Props) => {
  const { status, data: workouts } = useWorkoutHistory();
  const [isCreating, setIsCreating] = useState(false);

  const handleStartWorkout = () => {
    setIsCreating(true);

    startNewWorkoutAndNavigate().catch((e) => {
      console.log("Error creating workout, tell user to try again");
    });
  };

  const getMuscleGroupSet = (exercises: WorkoutExercise[]) => {
    const set = new Set<string>();

    exercises.forEach((e) => {
      e.primaryMuscleGroups?.forEach((pg) => set.add(pg));
      e.secondaryMuscleGroups?.forEach((sg) => set.add(sg));
    });

    return set;
  };

  if (status === STATUS.LOADING) {
    return null;
  }

  return (
    <Stack h="100%" gap={0}>
      <Group position="apart" py="sm">
        <Title order={3}>Workout History</Title>
        {!isWorkingOut && (
          <Button color={"teal"} onClick={handleStartWorkout} loading={isCreating}>
            {isCreating ? "Creating workout..." : "+ New Workout"}
          </Button>
        )}
      </Group>
      <Divider />
      <Stack py="md" pr="sm">
        {[...workouts].reverse().map((workout, i) => {
          const dateStarted = new Date(workout.dateStarted || "");

          return (
            <Card
              key={workout.historyId || `workout-${i}`}
              maw="600px"
              style={{ minWidth: "300px", overflow: "unset" }}
              withBorder
              shadow="sm"
            >
              <Text fz={"s"}>{dateStarted.toDateString()}</Text>
              <Text c="dimmed" fz={"xs"} fs={"italic"}>
                {workout.timeStarted} - {workout.timeEnded}
              </Text>
              <Divider />
              <Group my={"sm"}>
                {Array.from(getMuscleGroupSet(workout.exercises || [])).map((g) => (
                  <Badge key={g} variant="light" color="indigo" size="xs">
                    {g}
                  </Badge>
                ))}
              </Group>
              <Group position="left" align="flex-start">
                {workout.exercises?.map((exercise, i) => (
                  <ExerciseInfoDropdown
                    key={`exercise-${exercise.name}-${i}`}
                    name={exercise.name}
                    sets={exercise.sets}
                    units={exercise.units}
                  />
                ))}
              </Group>
            </Card>
          );
        })}
        {/*Object.entries(workouts)
          .reverse()
          .map(([day, times], i) => {
            return (
              <Stack key={day}>
                <Title order={4}>{day}</Title>
                <Group align={"flex-start"}>
                  {Object.entries(times).map(([time, workout]) => (
                    <Card key={day + time} withBorder maw={"250px"}>
                      <Text c="dimmed" fz={"xs"} fs={"italic"}>
                        {workout.timeStarted} - {workout.timeEnded}
                      </Text>
                      <Divider mb={"md"} />
                      <Stack>
                        {Object.entries(workout.completedExercises).map(([name, sets], i) => (
                          <ExerciseDropdownInfo key={`exercise-${name}-${i}`} name={name} sets={sets} />
                        ))}
                      </Stack>
                    </Card>
                  ))}
                </Group>
              </Stack>
            );
          })*/}
      </Stack>
    </Stack>
  );
};

export default HistorySection;

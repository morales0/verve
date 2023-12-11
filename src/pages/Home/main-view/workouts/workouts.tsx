import useWorkoutHistory from "@/hooks/workoutHistory.hook";
import { Stack } from "@mantine/core";
import { WorkoutCard } from "./workout-card";

export const Workouts = () => {
  const { status, data: workouts } = useWorkoutHistory();

  return (
    <Stack gap="lg">
      {[...workouts].reverse().map((w, i) => (
        <WorkoutCard key={w.historyId ?? `hist-${i}`} {...w} />
      ))}
    </Stack>
  );
};

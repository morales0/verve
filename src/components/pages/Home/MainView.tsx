import { Icon } from "@iconify/react";
import { Stack, Button, Group, Text, Title, Box } from "@mantine/core";
import MuscleGroupsSection from "../../../pages/Home/components/MuscleGroupsSection";
import WorkoutSummary from "./WorkoutSummary";
import { useNavigate } from "react-router-dom";
import useWorkout from "../../../hooks/workout.hook";
import useWorkoutHistory from "../../../hooks/workoutHistory.hook";
import { startWorkout } from "../../../services/firebase/general";
import { useUser } from "../../../context/user";

export const MainView = () => {
  const { dataRef, meta } = useUser();
  const { status, data: workouts } = useWorkoutHistory();
  const { status: workoutStatus, workout } = useWorkout();

  const navigate = useNavigate();

  const startNewWorkoutAndNavigate = async () => {
    return startWorkout(dataRef).then(() => {
      navigate("/workout");
    });
  };

  return (
    <Stack pb="lg">
      <MuscleGroupsSection />
      <Stack px="xs">
        {meta.isWorkingOut && workout ? (
          <WorkoutSummary current {...workout} />
        ) : (
          <Button
            size="lg"
            p="sm"
            variant="light"
            color="indigo"
            onClick={startNewWorkoutAndNavigate}
            sx={(theme) => ({
              boxShadow: `0 0 4px 0 ${theme.fn.rgba(theme.fn.themeColor("indigo"), 0.5)}`,
            })}
          >
            <Group spacing="sm">
              <Icon icon="bi:fire" />
              <Text>Start a workout!</Text>
            </Group>
          </Button>
        )}

        <Stack spacing="xs">
          <Title order={5}>Latest Workouts</Title>
          <Stack spacing="lg">
            {[...workouts].reverse().map((w, i) => (
              <WorkoutSummary key={w.historyId ?? `hist-${i}`} {...w} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

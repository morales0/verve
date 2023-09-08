import { Icon } from "@iconify/react";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { WorkoutSummary } from "../../components/pages/Home";
import { useUser } from "../../context/user";
import { startWorkout } from "../../services/firebase/general";
import useWorkoutHistory from "../../hooks/workoutHistory.hook";
import useWorkout from "../../hooks/workout.hook";
import MuscleGroupsSection from "./components/MuscleGroupsSection";

const Home = () => {
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
    <Stack p="xs" h="100%" sx={{ overflow: "auto" }} spacing="md">
      <MuscleGroupsSection />
      {meta.isWorkingOut && workout ? (
        <WorkoutSummary current {...workout} />
      ) : (
        <Button size="lg" p="sm" variant="light" color="indigo" onClick={startNewWorkoutAndNavigate}>
          <Group spacing="sm">
            <Icon icon="bi:fire" />
            <Text>Start a workout!</Text>
          </Group>
        </Button>
      )}

      <Stack spacing="xs">
        <Title order={5}>Latest Workouts</Title>
        <Stack spacing="lg">
          {[...workouts].reverse().map((w) => (
            <WorkoutSummary key={w.historyId} {...w} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;

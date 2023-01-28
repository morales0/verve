import { Button, Stack, Text } from "@mantine/core";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useIsWorkingOut } from "../../hooks/is-working-out-hook";
import useWorkoutHistory from "../../hooks/workoutHistory";
import CurrentWorkoutSummary from "./components/CurrentWorkoutSummary";
import HistorySection from "./components/HistorySection";
import LastWorkoutSummary from "./components/LastWorkoutSummary";
import MuscleGroupsSection from "./components/MuscleGroupsSection";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { workouts, setLimit, setHistoryType } = useWorkoutHistory();
  const {
    isWorkingOut,
    startWorkout,
    status: workingOutStatus,
  } = useIsWorkingOut();

  const startNewWorkoutAndNavigate = () => {
    console.log("Home return");

    return startWorkout().then(() => {
      navigate("/workout");
    });
  };

  if (workingOutStatus === "loading") {
    return <Text>Loading data...</Text>;
  }

  return (
    <Stack>
      <Button onClick={() => signOut(auth)}>Sign Out</Button>
      <MuscleGroupsSection />
      {isWorkingOut ? (
        <CurrentWorkoutSummary />
      ) : (
        <LastWorkoutSummary
          startNewWorkoutAndNavigate={startNewWorkoutAndNavigate}
        />
      )}
      <HistorySection workouts={workouts} />
    </Stack>
  );
};

export default Home;

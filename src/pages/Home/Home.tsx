import { Divider, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useIsWorkingOut } from "../../hooks/isWorkingOut.hook";
import CurrentWorkoutSummary from "./components/CurrentWorkoutSummary";
import HistorySection from "./components/HistorySection";
import LastWorkoutSummary from "./components/LastWorkoutSummary";
import MuscleGroupsSection from "./components/MuscleGroupsSection";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isWorkingOut, startWorkout, status: workingOutStatus } = useIsWorkingOut();

  const startNewWorkoutAndNavigate = () => {
    return startWorkout().then(() => {
      navigate("/workout");
    });
  };

  if (workingOutStatus === "loading") {
    return <Text>Loading data...</Text>;
  }

  return (
    <Stack p="1rem" h="100%" sx={{ overflow: "hidden" }} spacing="sm">
      <MuscleGroupsSection />
      <Divider mb={"1rem"} />
      {isWorkingOut && <CurrentWorkoutSummary />}
      <HistorySection startNewWorkoutAndNavigate={startNewWorkoutAndNavigate} isWorkingOut={isWorkingOut} />
    </Stack>
  );
};

export default Home;

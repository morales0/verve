import { Divider, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user";
import { startWorkout } from "../../services/firebase/general";
import CurrentWorkoutSummary from "./components/CurrentWorkoutSummary";
import HistorySection from "./components/HistorySection";
import MuscleGroupsSection from "./components/MuscleGroupsSection";

const Home = () => {
  const { dataRef, meta } = useUser();
  const navigate = useNavigate();

  const startNewWorkoutAndNavigate = async () => {
    return startWorkout(dataRef).then(() => {
      navigate("/workout");
    });
  };

  return (
    <Stack p="1rem" h="100%" sx={{ overflow: "hidden" }} spacing="sm">
      <MuscleGroupsSection />
      <Divider />
      {meta.isWorkingOut && <CurrentWorkoutSummary />}
      <HistorySection startNewWorkoutAndNavigate={startNewWorkoutAndNavigate} isWorkingOut={meta.isWorkingOut} />
    </Stack>
  );
};

export default Home;

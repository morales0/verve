import { Stack, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useIsWorkingOut } from "../../hooks/isWorkingOut.hook";
import useWorkout from "../../hooks/workout.hook";
import { STATUS } from "../../types/util";
import { UserExercise, WorkoutExercise } from "../../types/workout";
import AddExerciseScreen from "./components/AddExerciseScreen";
import ExerciseScreen from "./components/ExerciseScreen";
import { StatusBar } from "./components/StatusBar";
import SummaryScreen from "./components/SummaryScreen";

const Workout = () => {
  // server
  const { isWorkingOut, status: isWorkingOutStatus, endWorkout } = useIsWorkingOut();
  const { status: workoutStatus, workout, api } = useWorkout();

  // ui state
  const [activeTab, setActiveTab] = useState<string | null>("exercise");
  const [currentExercise, setCurrentExercise] = useState<WorkoutExercise | null>(null);

  // functions
  const startExercise = (ex: UserExercise) => {
    console.log(ex);
    setCurrentExercise({
      ...ex,
      sets: [ex.units.reduce<Record<string, number>>((obj, unit) => ((obj[unit] = 0), obj), {})],
    });
  };

  const finishExercise = async () => {
    if (currentExercise) {
      return api.addExercise(currentExercise).then(() => {
        setCurrentExercise(null);
      });
    }
  };

  const cancelExercise = () => {
    setCurrentExercise(null);
  };

  const updateExercise = (updates: Partial<WorkoutExercise>) => {
    setCurrentExercise((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          ...updates,
        };
      } else {
        return prevState;
      }
    });
  };

  const completeWorkout = () => {
    api.completeWorkout().then(() => endWorkout());
  };

  const cancelWorkout = () => {
    api.cancelWorkout().then(() => endWorkout());
  };

  // status checks
  if (isWorkingOutStatus === "loading") {
    return <Text>Checking for workout...</Text>;
  }

  if (!isWorkingOut) {
    return <Navigate to="/" replace />;
  }

  if (workoutStatus === STATUS.LOADING) {
    return <Text>Loading your workout!</Text>;
  }

  if (workoutStatus === STATUS.DELETING) {
    return <Text>Deleting your workout...</Text>;
  }

  if (workoutStatus === STATUS.COMPLETING) {
    return <Text>Completing your workout...</Text>;
  }

  // render page
  return (
    <Stack h="100%" px="1rem" sx={{ overflow: "hidden" }}>
      {!currentExercise && <StatusBar timeStarted={workout.timeStarted || "Time missing"} />}
      <Tabs
        variant="default"
        value={activeTab}
        onTabChange={setActiveTab}
        styles={() => ({
          root: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "hidden",
          },
        })}
      >
        <Tabs.List grow>
          <Tabs.Tab value="exercise">Exercise</Tabs.Tab>
          <Tabs.Tab value="summary">Summary</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="exercise" sx={{ flexGrow: 1, overflow: "hidden" }}>
          {currentExercise ? (
            <ExerciseScreen
              exercise={currentExercise}
              onFinish={finishExercise}
              onCancel={cancelExercise}
              updateExercise={updateExercise}
            />
          ) : (
            <AddExerciseScreen onAdd={startExercise} currentExerciseIds={workout.exercises?.map((e) => e.id || "")} />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="summary" sx={{ flexGrow: 1, overflow: "hidden" }}>
          <SummaryScreen exercises={workout.exercises} onCancel={cancelWorkout} onComplete={completeWorkout} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default Workout;

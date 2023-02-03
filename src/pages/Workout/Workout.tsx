import { Button, Group, Stack, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useIsWorkingOut } from "../../hooks/isWorkingOut.hook";
import useWorkout from "../../hooks/workout.hook";
import { STATUS } from "../../types/util";
import { UserExercise, WorkoutExercise } from "../../types/workout";
import AddExerciseScreen from "./components/AddExerciseScreen";
import CompletedExercises from "./components/CompletedExercises";
import ExerciseScreen from "./components/ExerciseScreen";
import { StatusBar } from "./components/StatusBar";

const Workout = () => {
  // server
  const { isWorkingOut, status: isWorkingOutStatus } = useIsWorkingOut();
  const { status, workout, api } = useWorkout();

  // ui state
  const [activeTab, setActiveTab] = useState<string | null>("exercise");
  const [currentExercise, setCurrentExercise] = useState<WorkoutExercise | null>(null);

  // functions
  const addExercise = (ex: UserExercise) => {
    console.log(ex);
    setCurrentExercise({
      name: ex.name,
      units: ex.units,
      sets: [],
      complete: false,
    });
  };

  // render
  if (isWorkingOutStatus === "loading") {
    return <Text>Checking for workout...</Text>;
  }

  if (!isWorkingOut) {
    return <Navigate to="/" replace />;
  }

  if (status === STATUS.LOADING) {
    return <Text>Loading your workout!</Text>;
  }

  return (
    <Stack h="100%" p="1rem" sx={{ overflow: "hidden" }}>
      <StatusBar timeStarted={workout.timeStarted || "Time missing"} />
      <Tabs
        variant="default"
        value={activeTab}
        onTabChange={setActiveTab}
        styles={(theme) => ({
          root: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "hidden",
            "& .mantine-Tabs-panel": {
              flexGrow: 1,
              overflow: "hidden",
            },
          },
        })}
      >
        <Tabs.List grow>
          <Tabs.Tab value="exercise">Exercise</Tabs.Tab>
          <Tabs.Tab value="summary">Summary</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="exercise">
          {currentExercise ? <ExerciseScreen {...currentExercise} /> : <AddExerciseScreen addExercise={addExercise} />}
        </Tabs.Panel>

        <Tabs.Panel value="summary">
          <Stack justify={"space-between"} h="100%" sx={{ overflow: "hidden" }}>
            <CompletedExercises />

            <Group w="100%" align={"center"} position="center" grow>
              <Button variant="outline" color="red">
                Cancel
              </Button>
              <Button variant="light" color="green">
                Complete
              </Button>
            </Group>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default Workout;

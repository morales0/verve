import {
  Box,
  Button,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useIsWorkingOut } from "../../hooks/is-working-out-hook";
import useWorkout from "../../hooks/workout";
import AddExerciseScreen from "./components/AddExerciseScreen";
import CompletedExercises from "./components/CompletedExercises";
import ExerciseScreen from "./components/ExerciseScreen";
import { StatusBar } from "./components/StatusBar";

type Exercise = {
  name: string;
  sets: object[];
};

const Workout = () => {
  const { workout, ...api } = useWorkout();
  const { isWorkingOut, status: isWorkingOutStatus } = useIsWorkingOut();
  const [activeTab, setActiveTab] = useState<string | null>("exercise");
  const [currentExercise, setCurrentExercise] = useState<null | Exercise>(null);

  const addExercise = (name: string) => {
    console.log(name);
  };

  if (isWorkingOutStatus === "loading") {
    return <Text>Checking for workout...</Text>;
  }

  if (!isWorkingOut) {
    return <Navigate to="/" replace />;
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
          {currentExercise ? (
            <ExerciseScreen {...currentExercise} />
          ) : (
            <AddExerciseScreen addExercise={addExercise} />
          )}
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

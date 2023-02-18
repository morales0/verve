import { Button, Group, Modal, Stack, Tabs, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useIsWorkingOut } from "../../hooks/isWorkingOut.hook";
import useUserExercises from "../../hooks/userExercises.hook";
import useWorkout from "../../hooks/workout.hook";
import { STATUS } from "../../types/util";
import { UserExercise, WorkoutExercise } from "../../types/workout";
import AddExerciseScreen from "./components/AddExerciseScreen";
import ExerciseForm from "./components/ExerciseForm";
import ExerciseScreen from "./components/ExerciseScreen/ExerciseScreen";
import { StatusBar } from "./components/StatusBar";
import SummaryScreen from "./components/SummaryScreen";

const Workout = () => {
  // server
  const { isWorkingOut, status: isWorkingOutStatus, endWorkout } = useIsWorkingOut();
  const { status: workoutStatus, workout, api } = useWorkout();
  const { api: userExercisesApi } = useUserExercises();

  // ui state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("exercise");
  const [exerciseToEdit, setExerciseToEdit] = useState<UserExercise | null>(null);
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

  const createExercise = async (data: UserExercise) => {
    return userExercisesApi.addChild(data).finally(() => setExerciseToEdit(null));
  };

  const editExercise = async (data: UserExercise) => {
    console.log(data);

    if (data.id) return userExercisesApi.updateChild(data.id, data).finally(() => setExerciseToEdit(null));
  };

  const deleteExercise = async (data?: UserExercise) => {
    if (data?.id) return userExercisesApi.removeChild(data.id);
  };

  // render page
  if (activeTab === "edit") {
    return (
      <ExerciseForm
        exerciseToEdit={exerciseToEdit || undefined}
        cancel={() => {
          setExerciseToEdit(null);
          setActiveTab("exercise");
        }}
        submitExercise={exerciseToEdit ? editExercise : createExercise}
      />
    );
  }

  return (
    <Stack h="100%" px="sm" pb="sm" sx={{ overflow: "hidden" }} spacing={0}>
      <Modal
        centered
        opened={deleteModalOpen}
        onClose={() => {
          setExerciseToEdit(null);
          setDeleteModalOpen(false);
        }}
        title="Are you sure?"
      >
        <Text mb="md">Deleting: {exerciseToEdit?.name}</Text>
        <Group position="apart">
          <Button
            variant="default"
            color="teal"
            onClick={() => {
              setExerciseToEdit(null);
              setDeleteModalOpen(false);
            }}
          >
            No, go back
          </Button>
          <Button variant="light" color="red" onClick={() => deleteExercise(exerciseToEdit || undefined)}>
            Yes, I want to delete
          </Button>
        </Group>
      </Modal>
      {!currentExercise && <StatusBar timeStarted={workout.timeStarted || "Time missing"} />}
      <Tabs
        variant="default"
        value={activeTab}
        onTabChange={setActiveTab}
        sx={() => ({
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
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
            <AddExerciseScreen
              onStart={startExercise}
              onEdit={(ex) => {
                setExerciseToEdit(ex);
                setActiveTab("edit");
              }}
              onDelete={(ex) => {
                setExerciseToEdit(ex);
                setDeleteModalOpen(true);
              }}
              onCreate={() => setActiveTab("edit")}
              currentExerciseIds={workout.exercises?.map((e) => e.id || "")}
            />
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

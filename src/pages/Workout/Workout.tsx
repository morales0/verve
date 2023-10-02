import { Button, Center, Group, Loader, Modal, Stack, Tabs, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useIsWorkingOut } from "../../hooks/isWorkingOut.hook";
import useUserExercises from "../../hooks/userExercises.hook";
import useWorkout from "../../hooks/workout.hook";
import { STATUS } from "../../types/util";
import { SetType, UserExercise, WorkoutExercise } from "../../types/workout";
import AddExerciseScreen from "./components/AddExerciseScreen";
import ExerciseForm from "./components/ExerciseForm";
import ExerciseScreen from "./components/ExerciseScreen/ExerciseScreen";
import { StatusBar } from "./components/StatusBar";
import SummaryScreen from "./components/SummaryScreen";
import { DeleteModal } from "../../components/pages/Workout";

const Workout = () => {
  // server
  const { endWorkout } = useIsWorkingOut();
  const { status: workoutStatus, workout, api } = useWorkout();
  const { api: userExercisesApi } = useUserExercises();

  // ui state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("exercise");
  const [exerciseToEdit, setExerciseToEdit] = useState<UserExercise | null>(null);
  const [currentExercise, setCurrentExercise] = useState<WorkoutExercise | null>(null);

  // functions
  const startExercise = (ex: UserExercise) => {
    let sets: SetType[];
    if (ex.weightType === "Barbell") {
      sets = [
        {
          values: ex.units.reduce<Record<string, string | number>>(
            (obj, unit) => ((obj[unit] = unit === "Weight" ? 45 : 0), obj),
            {}
          ),
          weights: { bar: 45 },
        },
      ];
    } else {
      sets = [{ values: ex.units.reduce<Record<string, string | number>>((obj, unit) => ((obj[unit] = 0), obj), {}) }];
    }

    setCurrentExercise({
      ...ex,
      sets,
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

  const removeWorkoutExercise = (id?: string) => {
    if (id) api.removeExercise(id);
  };

  const editWorkoutExercise = (ex: WorkoutExercise) => {
    setCurrentExercise(ex);
    setActiveTab("exercise");
    if (ex.workoutId) api.removeExercise(ex.workoutId);
  };

  const completeWorkout = () => {
    api.completeWorkout().then(() => endWorkout());
  };

  const cancelWorkout = () => {
    api.cancelWorkout().then(() => endWorkout());
  };

  // status checks

  if (workoutStatus === STATUS.LOADING) {
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );
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

  const handleDeleteModalClose = () => {
    setExerciseToEdit(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteModalDelete = () => deleteExercise(exerciseToEdit || undefined);

  if (currentExercise) {
    return (
      <ExerciseScreen
        exercise={currentExercise}
        onFinish={finishExercise}
        onCancel={cancelExercise}
        updateExercise={updateExercise}
      />
    );
  }

  return (
    <Stack h="100%" px="xs" pb="sm" sx={{ overflow: "hidden" }} spacing={0}>
      <DeleteModal
        opened={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteModalDelete}
        name={exerciseToEdit?.name}
      />
      {/* {!currentExercise && <StatusBar timeStarted={workout.timeStarted || "Time missing"} />} */}
      <Tabs
        variant="default"
        radius="xs"
        mt="xs"
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
          <SummaryScreen
            exercises={workout.exercises}
            canEditExercise={!currentExercise}
            onEditExercise={(ex) => editWorkoutExercise(ex)}
            onRemoveExercise={(ex) => removeWorkoutExercise(ex.workoutId)}
            onCancel={cancelWorkout}
            onComplete={completeWorkout}
          />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default Workout;

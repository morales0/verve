import { useUser } from "@/context";
import {
  addUserExercise,
  getUserExercises,
  removeUserExercise,
  updateUserExercise,
} from "@/services/exercises.service";
import { addExerciseToLog, getLoggingExercises } from "@/services/log.service";
import { LogExercise, UserExercise, WithId } from "@/types/app.types";
import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExerciseForm } from "./exercise-form";
import { ListExercise } from "./list-exercise";

export const List = () => {
  const { dataRef } = useUser();
  const navigate = useNavigate();
  const [newOpened, { open: openNew, close: closeNew }] = useDisclosure(false);

  // Get the user exercises
  const [exercises, setExercises] = useState<WithId<UserExercise>[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const off = getUserExercises(dataRef, setExercises, setLoading);

    return () => off();
  }, []);

  /*
  // Get the current log exercises
  const [logExercises, setLogExercises] = useState<WithId<LogExercise>[]>([]);
  useEffect(() => {
    const off = getLoggingExercises(dataRef, setLogExercises, setLoading);

    return () => off();
  }, []);

  const exerciseIdtoLogId = (id: string) => logExercises.find((log) => log.id === id)?.logId;

  const handleStartExercise = (exercise: UserExercise) => {
    const logId = exerciseIdtoLogId(exercise.id);

    // Create new logging exercise
    if (!logId) {
      return addExerciseToLog(dataRef, {
        ...exercise,
      }).then((logId) => {
        navigate(`/log/${logId}`);
        return logId;
      });
    }

    return navigate(`/log/${logId}`);
  };
  const handleDeleteExercise = (id: string) => removeUserExercise(dataRef, id);
  const handleCreateNewExercise = (exercise: Omit<UserExercise, "id">) =>
    addUserExercise(dataRef, exercise).then(() => {
      closeNew();
    });
    */
  const handleStartExercise = (exercise: WithId<UserExercise>) => {
    navigate(`/active-log/${exercise.id}`);
  };
  const handleEditExercise = (id: string, updates: Partial<Omit<UserExercise, "id">>) =>
    updateUserExercise(dataRef, id, updates);
  const handleDeleteExercise = (id: string) => removeUserExercise(dataRef, id);
  const handleCreateNewExercise = (exercise: Omit<UserExercise, "id">) =>
    addUserExercise(dataRef, exercise).then(() => {
      closeNew();
    });

  return (
    <Stack>
      <Group>
        <TextInput radius="xl" size="xs" style={{ flexGrow: 1 }} />
        <Button radius="xl" size="xs" leftSection={<IconPlus size={18} />} onClick={openNew}>
          New
        </Button>
        <Modal opened={newOpened} onClose={closeNew} title="New Exercise" centered>
          <ExerciseForm onSubmit={handleCreateNewExercise} />
        </Modal>
      </Group>
      <Stack gap="sm">
        {exercises.length ? (
          exercises.map((exercise, i) => (
            <ListExercise
              key={exercise.id}
              {...exercise}
              // started={!!exerciseIdtoLogId(exercise.id)}
              onDelete={() => handleDeleteExercise(exercise.id)}
              onEdit={(updates: Partial<Omit<UserExercise, "id">>) => handleEditExercise(exercise.id, updates)}
              onStart={() => handleStartExercise(exercise)}
            />
          ))
        ) : (
          <Text ta="center" c="dimmed">
            Time to make an exercise!
          </Text>
        )}
      </Stack>
    </Stack>
  );
};

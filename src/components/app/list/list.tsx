import { useUser } from "@/context";
import {
  addUserExercise,
  getUserExercises,
  removeUserExercise,
  updateUserExercise,
} from "@/services/exercises.service";
import { UserExercise, WithId } from "@/types/app.types";
import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewExerciseForm } from "@/components/forms";
import { ExerciseCard } from "./exercise-card";

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
  const handleArchiveExercise = (id: string) => updateUserExercise(dataRef, id, { archived: true });
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
          <NewExerciseForm onSubmit={handleCreateNewExercise} />
        </Modal>
      </Group>
      <Stack gap="sm">
        {exercises.length ? (
          exercises
            .filter((e) => !e.archived)
            .map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                // started={!!exerciseIdtoLogId(exercise.id)}
                onArchive={() => handleArchiveExercise(exercise.id)}
                onEdit={(updates: Partial<UserExercise>) => handleEditExercise(exercise.id, updates)}
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

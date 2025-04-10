import { useUser } from "@/context";
import { getLoggingExercises } from "@/services/log.service";
import { LogExercise, WithId } from "@/types/app.types";
import { Paper, Stack, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export const Summary = () => {
  const { dataRef } = useUser();

  // Get the current log exercises
  const [logExercises, setLogExercises] = useState<WithId<LogExercise>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const off = getLoggingExercises(dataRef, setLogExercises, setLoading);

    return () => off();
  }, []);

  return (
    <Stack>
      {logExercises.map((ex) => (
        <Paper key={ex.id}>
          <Text>{ex.id}</Text>
        </Paper>
      ))}
    </Stack>
  );
};

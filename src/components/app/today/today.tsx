import { useUser } from "@/context";
import { useFocusAreasMap } from "@/hooks/util";
import { getUserExercises } from "@/services/exercises.service";
import { getLoggingExercises, getTodayLog, removeExerciseFromLog } from "@/services/log.service";
import { LogExercise, UserExercise, WithId } from "@/types/app.types";
import { ActionIcon, Box, Divider, Loader, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogCard } from "./log-card";

export const Today = () => {
  const { dataRef } = useUser();
  const navigate = useNavigate();
  const focusAreasMap = useFocusAreasMap();

  // Subscribe to today's log
  const [todayLog, setTodayLog] = useState<WithId<LogExercise>[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!dataRef) return;
    const off = getTodayLog(dataRef, setTodayLog, setLoading);

    return () => off();
  }, [dataRef]);

  // Subscribe to today's ongoing log
  const [ongoingLog, setOngoingLog] = useState<WithId<LogExercise>[]>([]);
  useEffect(() => {
    if (!dataRef) return;
    const off = getLoggingExercises(dataRef, setOngoingLog, setLoading);

    return () => off();
  }, [dataRef]);

  // Create log id to user exercise name map
  // todo: move to a hook
  const [userExercises, setUserExercises] = useState<WithId<UserExercise>[]>([]);
  const userExercisesNameMap = useMemo(
    () => Object.fromEntries(userExercises.map(({ name, id }) => [id, name])),
    [userExercises]
  );
  useEffect(() => {
    if (!dataRef) return;
    const off = getUserExercises(dataRef, setUserExercises, setLoading);

    return () => off();
  }, [dataRef]);

  // handlers
  const handleRemoveExercise = (id: string) => removeExerciseFromLog(dataRef, id);

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <>
      <SimpleGrid cols={3}>
        <Box />
        <Text size="xs" tt="uppercase" fw={500} ff="heading" mx="auto" ta="center">
          Today
        </Text>
        <ActionIcon ml="auto" onClick={handleRefresh}>
          <IconRefresh stroke={1} />
        </ActionIcon>
      </SimpleGrid>

      <Stack gap="md">
        {loading && <Loader type="bars" mx="auto" size="sm" />}
        {!loading && !!ongoingLog.length && (
          <Stack gap="xs">
            <Text size="xs" ml="auto">
              Ongoing Exercises
            </Text>
            {ongoingLog.map((exercise) => (
              <LogCard
                key={exercise.id}
                {...exercise}
                name={exercise.type === "quick" ? exercise.name : userExercisesNameMap[exercise.userExerciseId]}
                focusAreas={exercise.focusAreaIds?.map((id) => focusAreasMap[id]).filter((a) => a !== undefined) ?? []}
                onRemove={() => handleRemoveExercise(exercise.id)}
              />
            ))}
            <Divider w="90%" mx="auto" />
          </Stack>
        )}

        {!loading && !!todayLog.length && (
          <Stack gap="xs">
            <Text size="xs" ml="auto">
              Completed
            </Text>
            {todayLog.map((exercise) => (
              <LogCard
                key={exercise.id}
                {...exercise}
                name={exercise.type === "quick" ? exercise.name : userExercisesNameMap[exercise.userExerciseId]}
                focusAreas={exercise.focusAreaIds?.map((id) => focusAreasMap[id]).filter((a) => a !== undefined) ?? []}
                onRemove={() => handleRemoveExercise(exercise.id)}
              />
            ))}
          </Stack>
        )}

        {!loading && ongoingLog.length === 0 && todayLog.length === 0 && (
          <Text size="sm" c="dimmed" ta="center">
            Lots of space to get started!
          </Text>
        )}
      </Stack>
    </>
  );
};

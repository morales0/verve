import { useUser } from "@/context";
import { getActiveLog, getLogsByDate, removeExerciseFromLog, updateLogExercise } from "@/services/log.service";
import { LogExercise, QuickLogExercise, UserExercise, WithId } from "@/types/app.types";
import { ActionIcon, Group, Loader, Paper, Stack, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuickLogCard } from "./quick-log-card";
import { useActiveLogExercises, useLogExercisesByDay } from "./data";
import { getDateTitle } from "./util";

export const Today = () => {
  const { dataRef } = useUser();
  const navigate = useNavigate();

  // local state for date selecting
  const [daysBack, setDaysBack] = useState(0);
  const dateTitle = useMemo(() => getDateTitle(daysBack), [daysBack]);

  const timestamp = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - daysBack);
    return daysBack === 0 ? undefined : date.getTime();
  }, [daysBack]);

  const { logs: currDayLogs, loading: isCurrDayLogsLoading } = useLogExercisesByDay(timestamp);
  const { logs: activeLogs, loading: isActiveLogsLoading } = useActiveLogExercises();

  // handlers
  const handleRemoveExercise = (id: string) => removeExerciseFromLog(dataRef, id);
  const handleUpdateExercise = async (exercise: WithId<QuickLogExercise>) => {
    console.log("Adding", exercise);
    await updateLogExercise(dataRef, exercise.id, {
      ...exercise,
    });
    close();
  };

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <>
      <Group gap="xs" wrap="nowrap">
        <ActionIcon size="xs" onClick={() => setDaysBack((prev) => prev + 1)}>
          <IconChevronLeft />
        </ActionIcon>
        <Text size="xs" tt="uppercase" fw={500} ff="heading" mx="auto" ta="center">
          {dateTitle}
        </Text>
        <ActionIcon size="xs" disabled={daysBack === 0} onClick={() => setDaysBack((prev) => Math.max(0, prev - 1))}>
          <IconChevronRight />
        </ActionIcon>
      </Group>

      <Stack gap="md">
        {isCurrDayLogsLoading && <Loader type="bars" mx="auto" size="sm" />}
        {!isCurrDayLogsLoading &&
          currDayLogs.length > 0 &&
          currDayLogs.map((ex) =>
            ex.type === "quick" ? (
              <QuickLogCard key={ex.id} {...ex} />
            ) : (
              <Paper key={ex.id} p="xs">
                <Text size="xs">{ex.id}</Text>
              </Paper>
            )
          )}

        {!isCurrDayLogsLoading && activeLogs.length === 0 && currDayLogs.length === 0 && (
          <Text size="sm" c="dimmed" ta="center">
            Lots of space to get started!
          </Text>
        )}
      </Stack>
    </>
  );
};

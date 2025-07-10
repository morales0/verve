import { DAYS_OF_WEEK } from "@/constants";
import { useUser } from "@/context";
import { getThisWeekLog } from "@/services/log.service";
import { LogExercise } from "@/types/app.types";
import { Center, Flex, Loader, Stack, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import classes from "./week-tracker.module.css";

export const WeekTracker = () => {
  const { dataRef } = useUser();
  const now = new Date();

  // Get logs for this week starting sunday
  const [weekLog, setWeekLog] = useState<LogExercise[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!dataRef) return;
    const off = getThisWeekLog(dataRef, setWeekLog, setLoading);

    return () => off();
  }, [dataRef]);

  // helper functions
  const isDayHit = (day: number) =>
    weekLog?.some((exercise) => {
      const date = new Date(exercise.timestamp);
      return date.getDay() === day;
    });

  return (
    <Stack w="100%" gap="xs">
      <Flex align="center" justify="space-between">
        <Text size="xs" tt="uppercase" fw={500} ff="heading">
          Week Tracker
        </Text>

        {/* <ActionIcon size="sm" color="default" >
          <IconArrowRight stroke={1.5} size={20} />
        </ActionIcon> */}
      </Flex>

      <Flex w="100%" justify="space-evenly">
        {DAYS_OF_WEEK.map((day, i) => {
          const isToday = i === now.getDay();
          const isHit = isDayHit(i);
          const isMissed = !isHit && i < now.getDay();

          return (
            <Center key={day} className={classes.dayBox} data-missed={isMissed} data-today={isToday} data-hit={isHit}>
              {loading ? (
                <Loader size="xs" type="dots" />
              ) : isHit ? (
                <Stack gap={0} align="center">
                  <Text fz={11} fw="inherit" c="inherit">
                    {day}
                  </Text>
                  <IconCheck size={10} />
                </Stack>
              ) : (
                <Text fz="sm" fw="inherit" c={isMissed ? "dimmed" : "inherit"}>
                  {day}
                </Text>
              )}
            </Center>
          );
        })}
      </Flex>
    </Stack>
  );
};

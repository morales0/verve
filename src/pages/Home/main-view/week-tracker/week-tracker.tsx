import { DAYS_OF_WEEK } from "@/constants";
import useWorkoutHistory from "@/hooks/workoutHistory.hook";
import { Center, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { findHitDays } from "./find-hit-days";
import classes from "./week-tracker.module.css";
import { IconCheck } from "@tabler/icons-react";

export const WeekTracker = () => {
  const theme = useMantineTheme();
  const { status, data } = useWorkoutHistory();

  const today = new Date().getDay();
  const hitDays = findHitDays(data.toReversed());

  return (
    <Flex w="100%" justify="space-evenly">
      {DAYS_OF_WEEK.map((day, i) => {
        const isToday = i === today;
        const isHit = hitDays[i];
        const isMissed = !isHit && i < today;

        return (
          <Center key={day} className={classes.dayBox} data-missed={isMissed} data-today={isToday} data-hit={isHit}>
            {isHit ? (
              <Stack gap={0} align="center">
                <Text fz={11} fw="inherit" c="inherit">
                  {day}
                </Text>
                <IconCheck stroke={3} size={10} />
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
  );
};

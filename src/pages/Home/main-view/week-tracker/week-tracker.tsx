import { Center, Flex, Text, rgba, useMantineTheme } from "@mantine/core";
import classes from "./week-tracker.module.css";
import useWorkoutHistory from "@/hooks/workoutHistory.hook";
import { WorkoutHistory } from "@/types/workout";
import { Icon } from "@iconify/react";

const daysOfWeek = ["S", "M", "T", "W", "Th", "F", "Sa"];

const findHitDays = (data: WorkoutHistory[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const hitDays = daysOfWeek.map(() => false);

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].dateStarted ?? "");

    // Calculate the diff in days bw the date and today
    const diffInDays = Math.floor((today.valueOf() - date.valueOf()) / (1000 * 60 * 60 * 24));

    // If the diff is greater than 6, then the date is outside of the week
    if (diffInDays > 6) {
      break;
    }

    // Get the day of the week
    const day = date.getDay();

    if (day <= today.getDay()) {
      hitDays[day] = true;
    }
  }

  return hitDays;
};

export const WeekTracker = () => {
  const theme = useMantineTheme();
  const { status, data } = useWorkoutHistory();

  const today = new Date().getDay();
  const hitDays = findHitDays(data.toReversed());

  return (
    <Flex w="100%" justify="space-evenly">
      {daysOfWeek.map((day, i) => {
        const isToday = i === today;
        const isHit = hitDays[i];
        const isMissed = !isHit && i < today;

        return (
          <Center key={day} className={classes.dayBox} data-missed={isMissed} data-today={isToday} data-hit={isHit}>
            <Text fz="sm" fw="inherit" c="inherit">
              {day}
            </Text>
          </Center>
        );
      })}
    </Flex>
  );
};

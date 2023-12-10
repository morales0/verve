import { Center, Flex, Stack, Text, getThemeColor, parseThemeColor, rgba, useMantineTheme } from "@mantine/core";
import classes from "./week-tracker.module.css";
import { Icon } from "@iconify/react";

const daysOfWeek = ["S", "M", "T", "W", "Th", "F", "S"];

export const WeekTracker = () => {
  const theme = useMantineTheme();
  return (
    <Flex w="100%" justify="space-evenly">
      {daysOfWeek.map((day, i) => (
        <Center
          key={day}
          className={classes.dayBox}
          data-missed={i < 3 && i !== 2}
          data-today={i === 3}
          data-hit={i === 2}
        >
          <Text fz="xs" fw={i === 3 ? 600 : 500} c={i == 2 ? "white" : ""}>
            {day}
          </Text>
          {i === 2 && false && (
            <Icon className={classes.fire} icon="bi:fire" color={rgba(theme.colors.violet[5], 0.3)} />
          )}
        </Center>
      ))}
    </Flex>
  );
};

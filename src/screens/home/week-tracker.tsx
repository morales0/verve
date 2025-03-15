import { DAYS_OF_WEEK } from "@/constants";
import { ActionIcon, Box, Center, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import classes from "./week-tracker.module.css";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";

export const WeekTracker = () => {
  const theme = useMantineTheme();

  const today = new Date().getDay();

  return (
    <Stack w="100%" gap="xs">
      <Flex align="center" justify="space-between">
        <Text size="xs" tt="uppercase" fw={500} ff="heading">
          Week Tracker
        </Text>

        <ActionIcon size="sm" color="default">
          <IconArrowRight stroke={1.5} size={20} />
        </ActionIcon>
      </Flex>

      <Flex w="100%" justify="space-evenly">
        {DAYS_OF_WEEK.map((day, i) => {
          const isToday = i === today;
          const isHit = i < today && (i % 3 === 0 || isToday); // Simulating a hit every 3 days
          const isMissed = !isHit && i < today;

          return (
            <Center key={day} className={classes.dayBox} data-missed={isMissed} data-today={isToday} data-hit={isHit}>
              {isHit ? (
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

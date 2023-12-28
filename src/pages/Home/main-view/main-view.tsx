import { Stack } from "@mantine/core";
import { Groups } from "./groups";
import { StartButton } from "./start-button";
import { WeekTracker } from "./week-tracker";
import { Workouts } from "./workouts";

export const MainView = () => {
  return (
    <Stack align="stretch" px="xs" pt="xs" pb="sm" gap="sm">
      <Groups />
      <WeekTracker />
      <StartButton />
      <Workouts />
    </Stack>
  );
};

import { Box, Divider, Center, Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";

export type ControlProps = {
  canRemoveCircuit: boolean;
  removeCurrCircuit: () => void;
  isStartingExercises: boolean;
  canStartExercises: boolean;
  onStartExercises: () => void;
  onCancelWorkout: () => void;
};

export const Control = ({
  canRemoveCircuit,
  removeCurrCircuit,
  isStartingExercises,
  canStartExercises,
  onStartExercises,
  onCancelWorkout,
}: ControlProps) => {
  return (
    <Box mt="auto" bg="var(--mantine-color-body">
      <Box display={canRemoveCircuit ? "" : "none"} px="xs">
        <Divider />
        <Center py={6}>
          <Button size="compact-sm" color="pink" onClick={removeCurrCircuit}>
            Remove Circuit
          </Button>
        </Center>
      </Box>

      <Divider />
      <Group w="100%" pt="sm" pb="lg" px="xs" align="center" justify="space-between" grow>
        <Button size="xs" variant="light" color="red" onClick={onCancelWorkout}>
          Cancel Workout
        </Button>
        <Button
          component={Link}
          to="/workout/summary"
          type="button"
          size="xs"
          color="blue.5"
          loading={isStartingExercises}
          disabled={!canStartExercises}
          onClick={
            canStartExercises
              ? onStartExercises
              : (e) => {
                  e.preventDefault();
                }
          }
        >
          Start
        </Button>
      </Group>
    </Box>
  );
};

import { Button, Divider, Group, Stack, Title } from "@mantine/core";
import { WorkoutExercise } from "../../../../types/workout";
import BarbellSet from "./BarbellSet";
import Set from "./Set";

type Props = {
  exercise: WorkoutExercise;
  onFinish: () => Promise<void>;
  onCancel: () => void;
  updateExercise: (updates: Partial<WorkoutExercise>) => void;
};

const ExerciseScreen = ({ exercise, onFinish, onCancel, updateExercise }: Props) => {
  // functions
  const addSet = () => {
    updateExercise({
      sets: [
        ...exercise.sets,
        exercise.units.reduce<Record<string, number>>((obj, unit) => ((obj[unit] = 0), obj), {}),
      ],
    });
  };
  const removeSet = () => {
    updateExercise({
      sets: exercise.sets.slice(0, -1),
    });
  };
  const updateSetValue = (index: number, unit: string, value: number) => {
    updateExercise({
      sets: exercise.sets.map((set, i) => (i === index ? { ...set, [unit]: value } : set)),
    });
  };

  // render
  return (
    <Stack justify="space-between" h="100%" sx={{ overflow: "hidden" }} spacing={0}>
      <Group align="center" position="apart" py="sm">
        <Title order={3}>{exercise.name}</Title>
        <Group align="stretch">
          <Button variant="default" color="gray" onClick={removeSet} size="xs" h="25px" w="36px">
            -
          </Button>
          <Button variant="default" color="gray" onClick={addSet} size="xs" h="25px" w="36px">
            +
          </Button>
        </Group>
      </Group>
      <Divider />
      <Stack w="100%" pr="sm" py="sm" sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }} spacing={5}>
        {exercise.sets.map((set, i) => {
          const updateUnitValue = (unit: string, value: number) => updateSetValue(i, unit, value);

          if (exercise.weightType === "Barbell") {
            return <BarbellSet key={`set-${i}`} set={set} onUnitChange={updateUnitValue} />;
          } else {
            return <Set key={`set-${i}`} set={set} onUnitChange={updateUnitValue} />;
          }
        })}
      </Stack>
      <Divider />
      <Group w="100%" py="md" align="center" position="apart" grow mt="auto">
        <Button variant="light" color="red" onClick={onCancel} size="sm">
          Cancel
        </Button>
        <Button gradient={{ from: "teal", to: "green", deg: 105 }} color="teal" onClick={onFinish} size="sm">
          Finish
        </Button>
      </Group>
    </Stack>
  );
};

export default ExerciseScreen;

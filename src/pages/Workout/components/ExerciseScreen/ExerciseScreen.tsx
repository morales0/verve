import { ActionIcon, Box, Button, Collapse, Divider, Group, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { WorkoutExercise } from "../../../../types/workout";
import BarbellSet from "./BarbellSet";
import Set from "./Set";
import useExerciseHistory from "../../../../hooks/exerciseHistory.hook";
import { useState } from "react";
import { Icon } from "@iconify/react";

type Props = {
  exercise: WorkoutExercise;
  onFinish: () => Promise<void>;
  onCancel: () => void;
  updateExercise: (updates: Partial<WorkoutExercise>) => void;
};

const ExerciseScreen = ({ exercise, onFinish, onCancel, updateExercise }: Props) => {
  const { status, data: history } = useExerciseHistory(exercise.id);
  const lastExercise = history[0];
  const lastExerciseDate = lastExercise && new Date(lastExercise.date);

  const [open, setOpen] = useState(false);

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
      {lastExercise && (
        <Stack spacing={0} align="center">
          <UnstyledButton
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "500px",
              border: "1px solid #dadada",
              background: "#e9e9e9",
              padding: "3px 7px",
              marginTop: "6px",
              borderRadius: "3px",
            }}
            onClick={() => setOpen((o) => !o)}
          >
            <Text fz="xs" fs="italic" c="dimmed">
              <Text component="span" fw={700}>
                Last time:
              </Text>{" "}
              {lastExerciseDate.toDateString()}
            </Text>
            <ActionIcon
              ml="sm"
              sx={{
                "& .iconify.open": {
                  transform: "rotate(180deg)",
                },
              }}
            >
              <Icon icon="material-symbols:keyboard-arrow-down-rounded" className={open ? "open" : ""} />
            </ActionIcon>
          </UnstyledButton>
          <Collapse px="xs" in={open} transitionDuration={80} transitionTimingFunction={"linear"}>
            <Group noWrap sx={{ overflowX: "auto" }}>
              <Stack spacing="xs">
                {exercise.units.map((unit) => (
                  <Text key={`${name}-${unit}`} fw="bold" fz="sm">
                    {unit}
                  </Text>
                ))}
              </Stack>
              {lastExercise.sets.map((set, i) => {
                return (
                  <Stack key={`${exercise.name}-set-${i}`} spacing="xs">
                    {exercise.units.map((unit) => (
                      <Text key={`${exercise.name}-${unit}-set-${i}-val`}>{set[unit]}</Text>
                    ))}
                  </Stack>
                );
              })}
            </Group>
          </Collapse>
        </Stack>
      )}
      <Stack w="100%" pr="sm" pb="sm" sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }} spacing={5}>
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

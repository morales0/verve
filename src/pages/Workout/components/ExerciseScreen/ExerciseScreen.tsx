import { Box, Button, Divider, Group, SegmentedControl, Stack, Title } from "@mantine/core";

import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import useExerciseHistory from "../../../../hooks/exerciseHistory.hook";
import { SetType, WorkoutExercise } from "../../../../types/workout";
import BarbellInput from "./BarbellInput";
import DumbbellInput from "./DumbbellInput";
import Set from "./Set";
import { ExerciseHistory } from "../../../../components/pages/Workout";

type Props = {
  exercise: WorkoutExercise;
  onFinish: () => Promise<void>;
  onCancel: () => void;
  updateExercise: (updates: Partial<WorkoutExercise>) => void;
};

const ExerciseScreen = ({ exercise, onFinish, onCancel, updateExercise }: Props) => {
  const [page, setPage] = useState("sets");
  const { status, data: history } = useExerciseHistory(exercise.id);
  const lastExercise = history[0];
  const lastExerciseDate = lastExercise && new Date(lastExercise.date);

  const [open, setOpen] = useState(false);

  // functions
  const addSet = () => {
    const newSet: SetType = {
      values:
        exercise.sets.length > 0
          ? exercise.sets[exercise.sets.length - 1].values
          : exercise.units.reduce<Record<string, string | number>>((obj, unit) => ((obj[unit] = 0), obj), {}),
      weights: (exercise.sets.length > 0 && exercise.sets[exercise.sets.length - 1].weights) || {},
    };
    updateExercise({
      sets: [...exercise.sets, newSet],
    });
  };
  const removeSet = () => {
    updateExercise({
      sets: exercise.sets.slice(0, -1),
    });
  };
  const updateSetValue = (index: number, unit: string, newValue: string | number) => {
    updateExercise({
      sets: exercise.sets.map((set, i) =>
        i === index ? { ...set, values: { ...set.values, [unit]: newValue } } : set
      ),
    });
  };

  const updateSetWeight = (index: number, weight: string, newValue: number) => {
    updateExercise({
      sets: exercise.sets.map((set, i) => {
        const newWeights = { ...set.weights, [weight]: newValue };
        const newWeightValue = Object.entries(newWeights)
          .filter(([plate, _]) => plate !== "bar")
          .reduce<number>((sum, [plate, count]) => sum + parseFloat(plate) * count, newWeights.bar);

        return i === index ? { ...set, values: { ...set.values, Weight: newWeightValue }, weights: newWeights } : set;
      }),
    });
  };

  // render
  return (
    <Stack justify="space-between" spacing={0} h="100%" px="xs" sx={{ overflow: "hidden" }}>
      <Group align="center" position="apart" py="xs">
        <Title order={3}>{exercise.name}</Title>
        <SegmentedControl
          value={page}
          onChange={setPage}
          size="sm"
          radius="md"
          color="violet"
          data={[
            { label: "Sets", value: "sets" },
            { label: "History", value: "history" },
          ]}
        />
      </Group>
      <Divider color="gray.6" />
      {/*  {lastExercise && (
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
      )} */}
      {page === "sets" && (
        <Stack w="100%" px="xs" py="sm" sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }} spacing="sm">
          {exercise.sets.map((set, i) => {
            const updateUnitValue = (unit: string, value: string | number) => updateSetValue(i, unit, value);
            const updateWeightValue = (weight: string, newValue: number) => updateSetWeight(i, weight, newValue);

            return (
              <Box key={`set-${i}`}>
                {/* <Flex>
                <Text h="100%" sx={{ alignSelf: "center" }} mr="xs" color="dimmed">
                  {i + 1}
                </Text>
                
              </Flex> */}

                <Set
                  num={i + 1}
                  set={set}
                  onUnitChange={updateUnitValue}
                  removeSet={removeSet}
                  isLastSet={i === exercise.sets.length - 1}
                />

                {exercise.weightType === "Barbell" && (
                  <BarbellInput weights={set.weights ?? {}} onWeightsChange={updateWeightValue} />
                )}
                {exercise.weightType === "Dumbbell" && (
                  <DumbbellInput weights={set.weights ?? {}} onWeightsChange={updateWeightValue} />
                )}
              </Box>
            );
          })}
          <Button
            variant="light"
            color="cyan.7"
            sx={({ colors }) => ({ border: `1px solid ${colors.cyan[6]}` })}
            onClick={addSet}
          >
            <IconPlus />
          </Button>
        </Stack>
      )}
      {page === "history" && <ExerciseHistory />}
      <Divider color="gray.6" mt="auto" />
      <Group w="100%" pb="lg" pt="sm" align="center" position="apart" grow>
        <Button
          variant="light"
          color="red"
          sx={({ colors }) => ({ border: `1px solid ${colors.red[4]}` })}
          onClick={onCancel}
          size="sm"
        >
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

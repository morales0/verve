import useWorkout from "@/hooks/workout.hook";
import { Box, Button, Divider, Flex, Group, Menu, SegmentedControl, Stack } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ExerciseSwitch } from "./exercise-switch";
import classes from "./exercises.module.css";
import { ExerciseTitle } from "./exercise-title";
import Set from "../components/ExerciseScreen/Set";
import BarbellInput from "../components/ExerciseScreen/BarbellInput";
import DumbbellInput from "../components/ExerciseScreen/DumbbellInput";
import { IconPlus } from "@tabler/icons-react";
import { ExerciseSet } from "@/types/workout";
import { decodeKey } from "@/functions/utils";

export const Exercises = () => {
  const params = useParams();
  const navigate = useNavigate();
  const workout = useWorkout();

  const group = Number(params["group"]);
  const index = params["index"];
  const exercises =
    group === 0 ? workout?.data.exercises?.["normal"] : workout?.data.exercises?.["circuits"]?.at(group - 1);
  const exercise = exercises?.at(Number(index));

  const addSet = () => {
    console.log("add", exercise);
    if (!exercise) return;

    const newSet: ExerciseSet = {
      values:
        exercise?.sets && exercise?.sets.length > 0
          ? exercise.sets[exercise.sets.length - 1].values
          : exercise.units.reduce<Record<string, string | number>>((obj, unit) => ((obj[unit] = 0), obj), {}),
      weights: (exercise.sets && exercise?.sets.length > 0 && exercise.sets[exercise.sets.length - 1].weights) || {},
    };

    console.log(newSet);
    workout.api.updateExercise(
      {
        sets: [...(exercise.sets ?? []), newSet],
      },
      group,
      Number(index)
    );
  };

  const removeSet = () => {
    if (!exercise?.sets) return;

    workout.api.updateExercise(
      {
        sets: exercise.sets?.slice(0, -1),
      },
      group,
      Number(index)
    );
  };
  const updateSetValue = (index: number, unit: string, newValue: string | number) => {
    if (!exercise?.sets) return;

    workout.api.updateExercise(
      {
        sets: exercise.sets.map((set, i) =>
          i === index ? { ...set, values: { ...set.values, [unit]: newValue } } : set
        ),
      },
      group,
      Number(index)
    );
  };

  const updateSetWeight = (index: number, weight: string, newValue: number) => {
    if (!exercise?.sets) return;

    workout.api.updateExercise(
      {
        sets: exercise.sets.map((set, i) => {
          const newWeights = { ...set.weights, [weight]: newValue };
          const newWeightValue = Object.entries(newWeights)
            .filter(([plate, _]) => plate !== "bar")
            .reduce<number>((sum, [plate, count]) => sum + parseFloat(decodeKey(plate)) * count, newWeights.bar);

          return i === index ? { ...set, values: { ...set.values, Weight: newWeightValue }, weights: newWeights } : set;
        }),
      },
      group,
      Number(index)
    );
  };

  if (!exercise) return null;

  return (
    <Stack className={classes.exercises} px="xs" gap={0} h="100%">
      <Flex justify="space-between" align="center" py={6}>
        {group === 0 ? (
          <ExerciseTitle name={exercise?.name} />
        ) : (
          <Menu position="bottom-start">
            <Menu.Target>
              <ExerciseSwitch exercise={exercise?.name} group={group} />
            </Menu.Target>
            <Menu.Dropdown>
              {exercises
                ?.map(({ id, name }, i) => ({ id, name, index: i }))
                ?.filter(({ id }) => id !== exercise.id)
                .map(({ id, name, index }) => (
                  <Menu.Item key={id} component={Link} to={`/workout/exercise/${group}/${index}`} replace>
                    {name}
                  </Menu.Item>
                ))}
            </Menu.Dropdown>
          </Menu>
        )}

        <SegmentedControl
          className={classes.pageSwitch}
          size="xs"
          data={[
            { label: "Sets", value: "sets" },
            { label: "History", value: "history" },
          ]}
        />
      </Flex>

      <Divider />

      <Stack w="100%" px="xs" py="sm" gap="sm">
        {exercise.sets?.map((set, i) => {
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
                isLastSet={!!exercise.sets && i === exercise.sets.length - 1}
              />

              {exercise.type === "Barbell" && (
                <BarbellInput weights={set.weights ?? {}} onWeightsChange={updateWeightValue} />
              )}
              {exercise.type === "Dumbbell" && false && (
                <DumbbellInput weights={set.weights ?? {}} onWeightsChange={updateWeightValue} />
              )}
              <Divider />
            </Box>
          );
        })}
        <Button
          variant="light"
          color="cyan.7"
          // sx={({ colors }) => ({ border: `1px solid ${colors.cyan[6]}` })}
          onClick={addSet}
        >
          <IconPlus />
        </Button>
      </Stack>

      <Divider mt="auto" />
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button size="sm" color="teal" onClick={() => navigate("/workout/summary")}>
          Go to Summary
        </Button>
      </Group>
    </Stack>
  );
};

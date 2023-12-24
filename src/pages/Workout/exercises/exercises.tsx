import { decodeKey } from "@/functions/utils";
import useWorkout from "@/hooks/workout.hook";
import { ExerciseSet } from "@/types/workout";
import { Box, Button, Center, Divider, Flex, Group, Loader, Menu, SegmentedControl, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import BarbellInput from "../components/ExerciseScreen/BarbellInput";
import DumbbellInput from "../components/ExerciseScreen/DumbbellInput";
import Set from "../components/ExerciseScreen/Set";
import { ExerciseSwitch } from "./exercise-switch";
import { ExerciseTitle } from "./exercise-title";
import classes from "./exercises.module.css";
import globalClasses from "@/styles/app.module.css";
import { findExerciseByIndices, getExercisesByGroup } from "./functions";
import { STATUS } from "@/types/util";

// todo: create context for execise state
export const Exercises = () => {
  const params = useParams();
  const navigate = useNavigate();

  /* URL state */
  const group = Number(params["group"]);
  const index = Number(params["index"]);

  /* Local state */

  /* Server */
  const workout = useWorkout();

  /* Data */
  const exercises = useMemo(
    () => getExercisesByGroup(workout.data?.exercises, group),
    [workout.data?.exercises, group]
  );
  const exercise = exercises.at(index);

  /* Functions */
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

  return workout.status === STATUS.SUCCESS && exercise ? (
    <Stack className={globalClasses.heightLocked} px="xs" gap={0}>
      <Flex justify="space-between" align="flex-end" pb={6}>
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
  ) : workout.status === STATUS.LOADING ? (
    <Center>
      <Loader />
    </Center>
  ) : (
    <Navigate to="/workout" replace />
  );
};

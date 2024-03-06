import { decodeKey } from "@/functions/utils";
import useWorkout from "@/hooks/workout.hook";
import globalClasses from "@/styles/app.module.css";
import { STATUS } from "@/types/util";
import { ExerciseSet as ExerciseSetType } from "@/types/workout";
import { Box, Button, Center, Divider, Flex, Group, Loader, Menu, SegmentedControl, Stack, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ExerciseSet } from "./exercise-set";
import { ExerciseSwitch } from "./exercise-switch";
import { ExerciseTitle } from "./exercise-title";
import classes from "./exercises.module.css";

import { getExercisesByGroup } from "./functions";
import { ExerciseHistoryData } from "@/components/app";

// todo: create context for execise state
export const Exercises = () => {
  const params = useParams();
  const navigate = useNavigate();

  /* URL state */
  const group = Number(params["group"]);
  const index = Number(params["index"]);

  /* Local state */
  const isCircuit = group > 0;
  const [page, setPage] = useState<string>("sets");

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
    if (!exercise) return;

    const newSet: ExerciseSetType = {
      values:
        exercise?.sets && exercise?.sets.length > 0
          ? exercise.sets[exercise.sets.length - 1].values
          : exercise.units.reduce<Record<string, string | number>>(
              (obj, unit) => ((obj[unit] = unit === "Weight" ? 45 : 0), obj),
              {}
            ),
      weights: (exercise.sets && exercise?.sets.length > 0 && exercise.sets[exercise.sets.length - 1].weights) || {
        bar: 45,
      },
    };

    return workout.api.updateExercise(
      {
        sets: [...(exercise.sets ?? []), newSet],
      },
      group,
      Number(index)
    );
  };

  const removeSet = () => {
    if (!exercise?.sets) return;

    return workout.api.updateExercise(
      {
        sets: exercise.sets?.slice(0, -1),
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

  const updateSet = (setIndex: number) => (updates: Partial<ExerciseSetType>) =>
    workout.api.updateExercise(
      {
        sets: exercise?.sets?.map((set, i) => (i === setIndex ? { ...set, ...updates } : set)),
      },
      group,
      index
    );

  return workout.status === STATUS.SUCCESS && exercise ? (
    <Flex className={globalClasses.heightLocked} direction="column" px="xs">
      <Flex justify="space-between" align="center" py={rem(6)}>
        {!isCircuit ? (
          <ExerciseTitle name={exercise.name} />
        ) : (
          <Menu position="bottom-start">
            <Menu.Target>
              <ExerciseSwitch exercise={exercise.name} group={group} />
            </Menu.Target>
            <Menu.Dropdown>
              {exercises
                .map(({ id, name }, i) => ({ id, name, index: i }))
                .filter(({ id }) => id !== exercise.id)
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
          value={page}
          onChange={setPage}
          data={[
            { label: "Sets", value: "sets" },
            { label: "History", value: "history" },
          ]}
        />
      </Flex>

      <Divider />

      {page === "sets" ? (
        <Stack className={globalClasses.scrollable} w="100%" px="xs" py="sm" gap="sm">
          {exercise.sets?.map((set, i, array) => (
            <ExerciseSet
              key={`set-${i}`}
              {...set}
              type={exercise.type}
              num={i + 1}
              updateSet={updateSet(i)}
              removeSet={removeSet}
              isLastSet={i === array.length - 1}
            />
          ))}

          <Button className={classes.addSetButton} variant="light" color="blue" onClick={addSet}>
            <IconPlus />
          </Button>
        </Stack>
      ) : (
        <Stack className={globalClasses.scrollable} w="100%" px="xs" py="sm" gap="sm">
          <ExerciseHistoryData id={exercise.id} />
        </Stack>
      )}

      <Divider mt="auto" />
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button
          size="sm"
          variant="light"
          color="red"
          onClick={() => {
            workout.api.removeExercises([exercise.id], group);
          }}
        >
          Delete
        </Button>
        <Button size="sm" color="teal" onClick={() => navigate("/workout/summary")}>
          Done
        </Button>
      </Group>
    </Flex>
  ) : workout.status === STATUS.LOADING ? (
    <Center>
      <Loader />
    </Center>
  ) : (
    <Navigate to="/workout" replace />
  );
};

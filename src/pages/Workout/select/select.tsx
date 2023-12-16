import useUserExercises from "@/hooks/userExercises.hook";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Badge,
  BadgeProps,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Group,
  Loader,
  Menu,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  createPolymorphicComponent,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import classes from "./select.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IconLocationSearch, IconPlus, IconX } from "@tabler/icons-react";
import { useScrollIntoView } from "@mantine/hooks";
import { Exercises } from "./exercises";
import { ExerciseSet, Workout, WorkoutExercise } from "@/types/workout";
import useWorkout from "@/hooks/workout.hook";
import { Search } from "./search";
import { Circuits } from "./circuits";
import { Control } from "./control";

const reduceCircuitSelections = (data: WorkoutExercise[] | undefined, size: number) =>
  data?.reduce<string[][]>(
    (arr, ex) => {
      if (ex.circuit < arr.length) {
        arr[ex.circuit].push(ex.id!);
      } else {
        arr[0].push(ex.id!);
      }

      return arr;
    },
    Array.from({ length: size }, () => [])
  ) ?? Array.from({ length: size }, () => []);

export const Select = () => {
  // console.log("SELECT");
  const location = useLocation();
  const navigate = useNavigate();

  /* Local state */
  // const [isStartingExercises, setIsStartingExercises] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(location?.state?.["name"] ?? "");
  const [filterOption, setFilterOption] = useState<"filter" | "sort" | undefined>(undefined);
  const [currCircuit, setCurrCircuit] = useState(0);
  const [numCircuits, setNumCircuits] = useState(0);

  /* Server state */
  const userExercises = useUserExercises();
  const workout = useWorkout();

  /* Data */
  const filteredExercises = userExercises.data.filter(
    (ex) => query === "" || ex.name.toLowerCase().includes(query.toLowerCase())
  );

  const selections: string[][] = useMemo(
    () => reduceCircuitSelections(workout.data.exercises, numCircuits + 1),
    [workout.data.exercises, numCircuits]
  );
  const filteredSelections = selections?.map((selection) =>
    selection.filter(
      (id) =>
        userExercises.data
          .find((ex) => ex.id === id)
          ?.name.toLowerCase()
          .includes(query.toLowerCase())
    )
  );

  /* Effects */
  // Update number of circuits when exercises change
  useEffect(() => {
    if (workout.data.exercises) {
      setNumCircuits(workout.data.exercises.reduce((max, ex) => Math.max(max, ex.circuit), 0));
    }
  }, [workout.data.exercises]);

  // const onChangeExercise = (id: string, checked: boolean) => {
  //   setSelections((prev) => {
  //     const newSelections = [...prev];

  //     if (checked && !prev[currGroup].includes(id)) {
  //       newSelections[currGroup] = [...newSelections[currGroup], id];
  //     } else {
  //       newSelections[currGroup] = newSelections[currGroup].filter((n) => n !== id);
  //     }
  //     return newSelections;
  //   });
  // };

  // const onChangeAllExercises = (checked: boolean) => {
  //   setSelections((prev) => {
  //     const newSelections = [...prev];

  //     if (checked) {
  //       newSelections[currGroup] = filteredExercises.map(({ id }) => id!);
  //     } else {
  //       newSelections[currGroup] = [];
  //     }
  //     return newSelections;
  //   });
  // };

  // const handleStartExercises: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
  //   event.stopPropagation();
  //   setIsStartingExercises(true);
  //   // Get exercise history
  //   // const historyRef = child(dataRef, `exerciseHistory/${ex.id}`);
  //   // const historyQuery = query(historyRef, limitToLast(1));
  //   // const lastExercise = Object.values((await get(historyQuery)).val() ?? {})[0] as ExerciseHistory;

  //   // if (lastExercise) {
  //   //   sets = lastExercise.sets;
  //   // } else if (ex.weightType === "Barbell") {
  //   //   sets = [
  //   //     {
  //   //       values: ex.units.reduce<Record<string, string | number>>(
  //   //         (obj, unit) => ((obj[unit] = unit === "Weight" ? 45 : 0), obj),
  //   //         {}
  //   //       ),
  //   //       weights: { bar: 45 },
  //   //     },
  //   //   ];
  //   // } else {
  //   //   sets = [{ values: ex.units.reduce<Record<string, string | number>>((obj, unit) => ((obj[unit] = 0), obj), {}) }];
  //   // }

  //   let firstExercise: string = "";
  //   // Create exercises in each group; ignore empty groups
  //   await Promise.all(
  //     selections
  //       .map((s, i) => ({ circuit: i, exs: s }))
  //       .filter(({ exs, circuit }) => circuit === 0 || exs.length > 0)
  //       .flatMap(({ circuit, exs }, i) =>
  //         exs.map(async (id) => {
  //           const ex = userExercises.find((ex) => ex.id === id)!;
  //           console.log("SELECT", id);
  //           const sets: ExerciseSet[] = [];
  //           const newWorkoutExercise: WorkoutExercise = {
  //             ...ex,
  //             circuit: circuit === 0 ? 0 : i,
  //             sets,
  //           };

  //           const key = await workoutApi.addExercise(newWorkoutExercise);
  //           if (i === 0) {
  //             firstExercise = key ?? "";
  //           }
  //         })
  //       )
  //   );

  //   // Navigate to workout page
  //   navigate(`/workout/exercise/${firstExercise}`);
  // };

  const handleAddCircuit = () => {
    setNumCircuits((prev) => prev + 1);
    setCurrCircuit((prev) => prev + 1);
  };

  return (
    <Stack className={classes.select} h="100%" gap={0}>
      <Search
        query={query}
        setQuery={setQuery}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        toggleFilterOption={(option) => setFilterOption((prev) => (prev === option ? undefined : option))}
      />
      <Divider />
      <Circuits
        selections={selections}
        addCircuit={handleAddCircuit}
        currCircuit={currCircuit}
        setCurrCircuit={(value) => setCurrCircuit(Number(value))}
      />
      <Divider mx="xs" />

      <Box className={classes.scroll} p="xs">
        {userExercises.status === "success" ? (
          <Exercises
            exercises={filteredExercises}
            total={userExercises.data.length}
            selections={filteredSelections}
            currGroup={currCircuit}
            onChange={(id, checked) => {}}
            onChangeAll={(checked) => {}}
          />
        ) : (
          <Center pt="md">
            {userExercises.status === "loading" ? <Loader /> : <Text>An error occurred. Try again.</Text>}
          </Center>
        )}
      </Box>
      {/* <Control /> */}
    </Stack>
  );
};

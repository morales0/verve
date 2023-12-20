import useUserExercises from "@/hooks/userExercises.hook";
import useWorkout from "@/hooks/workout.hook";
import globalClasses from "@/styles/app.module.css";
import { UserExercise, WorkoutExercise } from "@/types/workout";
import { Box, Divider, Stack } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Circuits } from "./circuits";
import { ExerciseSelection, Exercises } from "./exercises";
import { Search } from "./search";
import { Control } from "./control";
import { existsSync } from "fs";

/*
ex are listed by with their ex id
when ex is clicked -> add that ex to workout -> get wid back -> add wid, exid to correct index in selections array
ex is checked if ex id is in the current index
selections is state

*/

const mapExercisesToSelections = (data: WorkoutExercise[][] | undefined) =>
  data?.map((group) => group.map((wex, index) => ({ id: wex.id, name: wex.name, index }) as ExerciseSelection));

const filterExercisesByName = (data: UserExercise[], query: string) =>
  data.filter((ex) => query === "" || ex.name.toLowerCase().includes(query.toLowerCase()));

const filterSelectionsByExerciseName = (selections: ExerciseSelection[][], query: string) =>
  selections.map((selection) => selection.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase())));

// todo: paginate to avoid large amt of exercises
// todo: allow user to select same exercise in multiple
export const Select = () => {
  // console.log("SELECT");
  const location = useLocation();
  const navigate = useNavigate();

  /* Local state */
  const [isStartingExercises, setIsStartingExercises] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(location?.state?.["name"] ?? "");
  const [filterOption, setFilterOption] = useState<"filter" | "sort" | undefined>(undefined);
  const [currCircuit, setCurrCircuit] = useState(0);

  /* Server state */
  const userExercises = useUserExercises();
  const workout = useWorkout();

  /* Data */
  const filteredExercises = useMemo(
    () => filterExercisesByName(userExercises.data, query),
    [userExercises.data, query]
  );

  const selections: ExerciseSelection[][] = useMemo(
    () => mapExercisesToSelections(workout.data.exercises) ?? [[]],
    [workout.data.exercises]
  );

  const filteredSelections = useMemo(() => filterSelectionsByExerciseName(selections, query), [selections, query]);

  /* Functions */
  const handleSelectExercise = (id: UserExercise["id"]) => {
    const ex = filteredExercises.find((ex) => ex.id === id);
    console.log(ex, id, currCircuit);
    if (!ex) return;

    return workout.api.addExercises([{ ...ex }], currCircuit);
  };

  const handleDeselectExercise = (id: UserExercise["id"]) => workout.api.removeExercises(currCircuit, [id]);

  const handleChangeAllExercises = (checked: boolean) =>
    checked
      ? workout.api.addExercises(
          filteredExercises.filter(
            (ex) => currCircuit === selections.length || !selections[currCircuit].map((s) => s.id).includes(ex.id)
          ),
          currCircuit
        )
      : workout.api.removeExercises(
          currCircuit,
          filteredExercises.map((ex) => ex.id)
        );

  const handleRemoveCurrCircuit = async () => {
    return workout.api.removeCircuit(currCircuit).then(() => setCurrCircuit((prev) => prev - 1));
  };

  const handleStartExercises = () => {
    setIsStartingExercises(true);
    navigate(`/workout/exercise`);
  };

  return (
    <Stack className={globalClasses.heightLocked} h="100%" gap={0}>
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
        currCircuit={currCircuit}
        setCurrCircuit={(value) => setCurrCircuit(Number(value))}
      />
      <Divider mx="xs" />

      <Box className={globalClasses.scrollable} p="xs">
        <Exercises
          exercises={filteredExercises}
          status={userExercises.status}
          total={userExercises.data.length}
          selections={filteredSelections}
          currCircuit={currCircuit}
          onSelect={handleSelectExercise}
          onDeselect={handleDeselectExercise}
          onChangeAll={handleChangeAllExercises}
        />
      </Box>
      <Control
        canRemoveCircuit={currCircuit !== selections.length && currCircuit !== 0}
        removeCurrCircuit={handleRemoveCurrCircuit}
        isStartingExercises={isStartingExercises}
        onStartExercises={handleStartExercises}
      />
    </Stack>
  );
};

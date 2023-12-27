import useUserExercises from "@/hooks/userExercises.hook";
import useWorkout from "@/hooks/workout.hook";
import globalClasses from "@/styles/app.module.css";
import { UserExercise } from "@/types/workout";
import { Box, Divider, Stack } from "@mantine/core";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Circuits } from "./circuits";
import { Control } from "./control";
import { Exercises } from "./exercises";
import { filterExercisesByName, filterSelectionsByExerciseName, mapExercisesToSelections } from "./functions";
import { Search } from "./search";

/*
ex are listed by with their ex id
when ex is clicked -> add that ex to workout -> get wid back -> add wid, exid to correct index in selections array
ex is checked if ex id is in the current index
selections is state

*/

// todo: paginate to avoid large amt of exercises
// todo: allow user to select same exercise in multiple
// todo: create context for local select state
export const Select = () => {
  // console.log("SELECT");
  const location = useLocation();
  const navigate = useNavigate();

  /* Local state */
  const [isStartingExercises, setIsStartingExercises] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(location?.state?.["name"] ?? "");
  const [filterOption, setFilterOption] = useState<"filter" | "sort" | undefined>(undefined);
  const [currGroup, setCurrGroup] = useState(0);

  /* Server state */
  const userExercises = useUserExercises();
  const workout = useWorkout();

  /* Data */
  const filteredExercises = useMemo(
    () => filterExercisesByName(userExercises.data, query),
    [userExercises.data, query]
  );
  const selections = useMemo(() => mapExercisesToSelections(workout.data?.exercises), [workout.data?.exercises]);
  const filteredSelections = useMemo(() => filterSelectionsByExerciseName(selections, query), [selections, query]);

  /* Functions */
  const handleSelectExercise = (id: UserExercise["id"]) => {
    const ex = filteredExercises.find((ex) => ex.id === id);
    if (!ex) return;

    return workout.api.addExercises([{ ...ex }], currGroup);
  };

  const handleDeselectExercise = (id: UserExercise["id"]) => workout.api.removeExercises([id], currGroup);

  const handleChangeAllExercises = (checked: boolean) =>
    checked
      ? workout.api.addExercises(
          filteredExercises.filter(
            (ex) => currGroup === selections.length || !selections[currGroup].map((s) => s.id).includes(ex.id)
          ),
          currGroup
        )
      : workout.api.removeExercises(
          filteredExercises.map((ex) => ex.id),
          currGroup
        );

  const handleRemoveCurrCircuit = async () => {
    return workout.api.removeCircuit(currGroup);
  };

  const handleStartExercises = () => {
    setIsStartingExercises(true);
    const group = currGroup === selections.length ? selections.length - 1 : currGroup;
    navigate(`/workout/exercise/${group}/0`);
  };

  return (
    <Stack className={globalClasses.heightLocked} gap={0}>
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
        currCircuit={currGroup}
        setCurrCircuit={(value) => setCurrGroup(Number(value))}
      />
      <Divider mx="xs" />

      <Box className={globalClasses.scrollable} p="xs">
        <Exercises
          exercises={filteredExercises}
          status={userExercises.status}
          total={userExercises.data.length}
          selections={filteredSelections}
          currCircuit={currGroup}
          onSelect={handleSelectExercise}
          onDeselect={handleDeselectExercise}
          onChangeAll={handleChangeAllExercises}
        />
      </Box>
      <Control
        canRemoveCircuit={currGroup !== selections.length && currGroup !== 0}
        removeCurrCircuit={handleRemoveCurrCircuit}
        isStartingExercises={isStartingExercises}
        canStartExercises={selections.some((selection) => selection.length > 0)}
        onStartExercises={handleStartExercises}
      />
    </Stack>
  );
};

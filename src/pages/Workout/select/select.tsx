import useUserExercises from "@/hooks/userExercises.hook";
import useWorkout from "@/hooks/workout.hook";
import globalClasses from "@/styles/app.module.css";
import { UserExercise } from "@/types/workout";
import { ActionIcon, Box, Divider, Flex, Stack, Title } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Circuits } from "./circuits";
import { Control } from "./control";
import { Exercises } from "./exercises";
import {
  filterExercisesByFilters,
  filterExercisesByName,
  filterSelectionsByExerciseName,
  mapExercisesToSelections,
  sortExercises,
} from "./functions";
import { Search } from "./search";

// todo: paginate to avoid large amt of exercises
// todo: allow user to select same exercise in multiple
// todo: create context for local select state
export const Select = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* Local state */
  const [isStartingExercises, setIsStartingExercises] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(location?.state?.["name"] ?? "");
  const [filterOption, setFilterOption] = useState<"filter" | "sort" | undefined>(undefined);
  const [currGroup, setCurrGroup] = useState(0);

  const [sort, setSort] = useState<{ order: string; value: string; label: string }>({
    order: "desc",
    value: "name",
    label: "Name",
  });
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  /* Server state */
  const userExercises = useUserExercises();
  const workout = useWorkout();

  /* Data */
  const filteredExercises = useMemo(
    () => sortExercises(filterExercisesByFilters(filterExercisesByName(userExercises.data, query), filters), sort),
    [userExercises.data, query, sort, filters]
  );
  const selections = useMemo(() => mapExercisesToSelections(workout.data?.exercises), [workout.data?.exercises]);
  const filteredSelections = useMemo(() => filterSelectionsByExerciseName(selections, query), [selections, query]);

  /* Functions */
  const handleDeleteExercise = (id: UserExercise["id"]) => userExercises.api.removeChild(id);
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
  const cancelWorkout = () => workout.api.cancelWorkout().then(() => navigate("/"));

  return (
    <Stack className={globalClasses.heightLocked} gap={0}>
      <Box px="xs">
        <Flex align="center">
          <Title order={5}>Choose your exercises</Title>
          <ActionIcon variant="subtle" ml="auto">
            <IconHelp />
          </ActionIcon>
        </Flex>
        <Divider />
      </Box>

      <Circuits
        selections={selections}
        currCircuit={currGroup}
        setCurrCircuit={(value) => setCurrGroup(Number(value))}
      />
      <Search
        query={query}
        setQuery={setQuery}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        toggleFilterOption={(option) => setFilterOption((prev) => (prev === option ? undefined : option))}
        sort={sort}
        setSort={(value: { label: string; value: string }) => setSort((prev) => ({ ...prev, ...value }))}
        setOrder={(value: string) => setSort((prev) => ({ ...prev, order: value }))}
        filters={filters}
        setFilters={setFilters}
        changeFilter={(key, value, checked) =>
          setFilters((prev) => ({
            ...prev,
            [key]: checked ? [...(prev[key] ?? []), value] : (prev[key] ?? []).filter((v) => v !== value),
          }))
        }
      />
      <Divider mx="xs" />

      <Box className={globalClasses.scrollable} p="xs">
        <Exercises
          query={query}
          exercises={filteredExercises}
          status={userExercises.status}
          total={userExercises.data.length}
          selections={filteredSelections}
          currCircuit={currGroup}
          onSelect={handleSelectExercise}
          onDeselect={handleDeselectExercise}
          onChangeAll={handleChangeAllExercises}
          onDeleteExercise={handleDeleteExercise}
        />
      </Box>
      <Control
        canRemoveCircuit={currGroup !== selections.length && currGroup !== 0}
        removeCurrCircuit={handleRemoveCurrCircuit}
        isStartingExercises={isStartingExercises}
        canStartExercises={selections.some((selection) => selection.length > 0)}
        onStartExercises={handleStartExercises}
        onCancelWorkout={cancelWorkout}
      />
    </Stack>
  );
};

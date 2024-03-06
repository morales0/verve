import useExerciseHistory from "@/hooks/exerciseHistory.hook";
import useUserExercises from "@/hooks/userExercises.hook";
import { ExerciseSet } from "@/types/workout";
import { LineChart } from "@mantine/charts";
import { Select, Stack, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { ExerciseDropdown } from "../main-view/workouts/exercise-dropdown";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

export const unitsToType = (units: string[]) => {
  if (units.length === 1) return "single";
  if (units.length === 2 && units.includes("Reps") && units.includes("Weight")) return "weight";

  return "multi";
};

const singleUnitMapper = (sets: ExerciseSet[]) =>
  sets.reduce((acc, set) => {
    const setVal = Number(Object.values(set.values)[0]);
    return setVal > acc ? setVal : acc;
  }, -1);

const oneRepMaxEquation = (weight: number, reps: number) => weight / (1.0278 - 0.0278 * reps);
const weightMapper = (sets: ExerciseSet[]) =>
  sets.reduce((acc, set) => {
    const setReps = Number(set.values["Reps"]);
    const setWeight = Number(set.values["Weight"]);

    const setStrengthIndex = oneRepMaxEquation(setWeight, setReps);

    return setStrengthIndex > acc ? setStrengthIndex : acc;
  }, -1);

export const ExercisesView = () => {
  const theme = useMantineTheme();
  const [exercise, setExercise] = useState<string | null>(null);

  const userExercises = useUserExercises();
  const { data: history, status: historyStatus } = useExerciseHistory(exercise ?? undefined, 10);
  const currExerciseData = userExercises.data.find((ex) => ex.id === exercise);
  const type = unitsToType(currExerciseData?.units ?? []);

  const data = history.map(({ date, sets }) => {
    const dateObj = new Date(date);
    return {
      date: dateObj.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      maxSet: type === "weight" ? weightMapper(sets) : singleUnitMapper(sets),
    };
  });

  return (
    <Stack p="xs">
      <Select
        value={exercise}
        onChange={setExercise}
        data={userExercises.data.map(({ id, name }) => ({ value: id, label: name }))}
      />
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: "maxSet", label: "Max Set", color: "teal.6" }]}
        curveType="bump"
        strokeWidth={1}
      />
      <Stack>
        {history.toReversed().map((ex) => (
          <ExerciseDropdown
            key={ex.exId + ex.histId}
            name={formatDate(ex.date)}
            sets={ex.sets}
            units={currExerciseData?.units ?? []}
          />
        ))}
      </Stack>
    </Stack>
  );
};

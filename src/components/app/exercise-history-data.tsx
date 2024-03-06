import useExerciseHistory from "@/hooks/exerciseHistory.hook";
import useUserExercises from "@/hooks/userExercises.hook";
import { ExerciseDropdown } from "@/pages/Home/main-view/workouts/exercise-dropdown";
import { ExerciseSet } from "@/types/workout";
import { LineChart } from "@mantine/charts";
import { Select, Stack, useMantineTheme } from "@mantine/core";
import { useState } from "react";

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

export type ExerciseHistoryDataProps = {
  id: string | null | undefined;
};
export const ExerciseHistoryData = ({ id }: ExerciseHistoryDataProps) => {
  const userExercises = useUserExercises();
  const { data: history, status: historyStatus } = useExerciseHistory(id ?? undefined, 15);
  const currExerciseData = userExercises.data.find((ex) => ex.id === id);
  const type = unitsToType(currExerciseData?.units ?? []);

  const data = history.map(({ date, sets }) => {
    const dateObj = new Date(date);
    return {
      date: dateObj.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      maxSet: type === "weight" ? weightMapper(sets) : singleUnitMapper(sets),
    };
  });

  return (
    <Stack gap="xs">
      <LineChart
        h={200}
        data={data}
        dataKey="date"
        series={[{ name: "maxSet", label: "Max Set", color: "teal.6" }]}
        yAxisProps={{ tickMargin: 15, orientation: "left" }}
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

import { Stack, useMantineTheme } from "@mantine/core";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useExerciseHistory from "../../hooks/exerciseHistory.hook";
import { ExerciseSet } from "../../types/workout";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

export type ExerciseHistoryProps = {
  id: string;
  units: string[];
};
export const ExerciseGraph = ({ id, units }: ExerciseHistoryProps) => {
  const theme = useMantineTheme();
  const { data: history, status } = useExerciseHistory(id, 10);

  const type = unitsToType(units);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Best Set",
      },
    },
    scales: {
      y: {
        grace: "15%",
        min: 0,
      },
    },
  };

  const labels = history.map(({ date }) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "2-digit" });
  });

  const datasets = [
    {
      data: history.map(({ sets }) => (type === "weight" ? weightMapper(sets) : singleUnitMapper(sets))),
      borderColor: theme.colors.teal[7],
      backgroundColor: theme.fn.rgba("teal.7", 0.5),
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} height={"100%"} />;
};

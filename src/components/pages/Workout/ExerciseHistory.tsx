import { Stack } from "@mantine/core";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import useExerciseHistory from "../../../hooks/exerciseHistory.hook";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels1 = ["January", "February", "March", "April", "May", "June", "July"];

export const data1 = {
  labels1,
  datasets: [
    {
      label: "Dataset 1",
      data: labels1.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels1.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export type ExerciseHistoryProps = {
  id: string;
  type: "reps" | "weight" | "other";
};
export const ExerciseHistory = ({ id, type }: ExerciseHistoryProps) => {
  const { data: history, status } = useExerciseHistory(id, 10);

  console.log(history);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: type === "reps" ? "Total Reps" : "Average Volume",
      },
    },
  };

  const labels = history.map(({ date }) => {
    const dateObj = new Date(date);

    console.log(date);

    return dateObj.toLocaleDateString();
  });
  const datasets = [
    {
      // label: type === "reps" ? "Total Reps" : "Average Volume",
      data: history.map(({ sets }) => {
        const sum = sets.reduce((acc, set) => {
          if (set.values) {
            if (type === "reps") return acc + Number(set.values["Reps"]);

            const vol = set.values["Reps"] * set.values["Weight"];
            return acc + vol;
          } else {
            if (type === "reps") return acc + Number(set["Reps"]);

            const vol = set["Reps"] * set["Weight"];
            return acc + vol;
          }
        }, 0);

        return type === "reps" ? sum : sum / sets.length;
      }),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <Stack>
      <Line options={options} data={data} height={400} />
    </Stack>
  );
};

import { Box, useMantineTheme } from "@mantine/core";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import useWorkoutHistory from "../../../hooks/workoutHistory.hook";
import { useUser } from "../../../context/user";
import { child } from "firebase/database";
import useDatabaseList from "../../../hooks/databaseList.hook";
import { WorkoutHistory } from "../../../types/workout";

function getShortenedMonthName(monthIndex: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[monthIndex];
}

function getShortenedMonthsList(): string[] {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const monthsList: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12; // Handling wrap-around for the months
    const shortenedMonthName = getShortenedMonthName(monthIndex);
    monthsList.push(shortenedMonthName);
  }

  return monthsList;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const WorkoutsChart = () => {
  const { dataRef } = useUser();
  const historyRef = child(dataRef, "/history");
  const { status, data: workouts } = useDatabaseList<WorkoutHistory>(historyRef);

  const theme = useMantineTheme();

  const monthMap: Record<string, number> = {};
  workouts.forEach(({ dateStarted }) => {
    const mon = new Date(dateStarted ?? "").getMonth();
    const monName = getShortenedMonthName(mon);
    monthMap[monName] = monthMap[monName] ? monthMap[monName] + 1 : 1;
  });

  const labels = getShortenedMonthsList();

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((month) => monthMap[month]),
        backgroundColor: theme.fn.rgba(theme.colors.blue[8], 0.5),
        borderWidth: 0,
        borderColor: theme.fn.themeColor("indigo"),
        borderRadius: 3,
        barPercentage: 0.5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          ...(theme.colorScheme === "dark" && { color: theme.colors.gray[5] }),
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          ...(theme.colorScheme === "dark" && { color: theme.colors.gray[7] }),
        },
        ticks: {
          count: 3,
          precision: 0,
          ...(theme.colorScheme === "dark" && { color: theme.colors.gray[5] }),
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: "My Workouts",
        color: theme.colorScheme === "dark" ? "white" : "",
      },
    },
  };

  return <Bar options={options} data={data} />;
};

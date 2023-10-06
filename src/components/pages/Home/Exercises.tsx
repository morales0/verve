import { Box, Divider, Paper, Select, Stack, Tabs, Text } from "@mantine/core";
import { ExerciseSelect } from "../../app";
import { useState } from "react";
import { UserExercise } from "../../../types/workout";
import { ExerciseGraph } from "../../app/ExerciseGraph";
import useUserExercises from "../../../hooks/userExercises.hook";
import ExerciseInfoDropdown from "../../app/ExerciseInfoDropdown";
import useExerciseHistory from "../../../hooks/exerciseHistory.hook";

const formatDate = (date: string) => new Date(date).toLocaleDateString();
export const Exercises = () => {
  const [currExercise, setCurrExercise] = useState<string | null>(null);

  const { data: userExercises } = useUserExercises();
  const currExerciseData = userExercises.find(({ id }) => id === currExercise);

  const { data: exercises } = useExerciseHistory(currExercise ?? undefined, 10);
  console.log(currExercise);

  return (
    <Stack p="xs" pt={0} pb="lg" h="100%" spacing="xs">
      <Stack spacing={0}>
        <ExerciseSelect value={currExercise} onChange={setCurrExercise} />
        <Divider />
      </Stack>

      <Paper withBorder p="xs" sx={(theme) => ({ borderColor: theme.colors.cyan[7] })}>
        <Text fw={500}>Overview</Text>
        <Text>PR: Coming soon</Text>
        <Text>Average use: Coming soon</Text>
      </Paper>

      {currExercise && (
        <Tabs
          defaultValue="history"
          keepMounted={false}
          color="cyan"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Tabs.List grow>
            <Tabs.Tab value="history">History</Tabs.Tab>
            <Tabs.Tab value="graph">Graph</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="history" sx={{ flexGrow: 1, overflow: "auto" }}>
            {currExerciseData &&
              exercises.map((ex) => (
                <ExerciseInfoDropdown
                  key={ex.exId + ex.histId}
                  name={formatDate(ex.date)}
                  sets={ex.sets}
                  units={currExerciseData.units}
                />
              ))}
          </Tabs.Panel>
          <Tabs.Panel value="graph" sx={{ flexGrow: 1, overflow: "auto" }}>
            {currExercise && currExerciseData ? (
              <ExerciseGraph id={currExercise} units={currExerciseData.units} />
            ) : (
              <Text>No data</Text>
            )}
          </Tabs.Panel>
        </Tabs>
      )}
    </Stack>
  );
};

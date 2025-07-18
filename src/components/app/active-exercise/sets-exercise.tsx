import { SetCard } from "@/components/ui";
import { useDatabaseValue } from "@/hooks/db";
import { LoggingSetsUserExercise, Set, SetsUserExercise, WithId } from "@/types/app.types";
import { Button, Flex, Stack, Tabs, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";

export type SetsExerciseProps = {
  exercise: WithId<SetsUserExercise>;
};
export const SetsExercise = ({ exercise }: SetsExerciseProps) => {
  const { data: timestamp } = useDatabaseValue<string>(`activeLog/date`);
  const { data, api } = useDatabaseValue<LoggingSetsUserExercise>(`activeLog/exercises/${exercise.id}`);

  const logExercise = useMemo(() => {
    if (!timestamp) return undefined;

    const obj: LoggingSetsUserExercise = {
      ...data,
      type: "sets",
      timestamp: new Date(timestamp).getTime(),
      userExerciseId: exercise.id,
    };

    return obj;
  }, [data, timestamp]);

  const handleAddSet = () => {
    if (logExercise?.sets) {
      api.updateValue({
        sets: [...logExercise.sets, logExercise.sets.at(-1)!],
      });
    } else {
      const newSet: Set = {
        values: Object.fromEntries(exercise.metrics.map((m) => [m.name, 0])),
      };
      api.updateValue({ sets: [newSet] });
    }
  };

  const handleUpdateSet = (idx: number, name: string, value: string | number) => {
    const target = logExercise?.sets?.at(idx);
    if (!target) return;

    const newSet = {
      ...target,
      values: {
        ...target.values,
        [name]: value,
      },
    };
    api.updateValue({
      sets: logExercise?.sets?.map((s, i) => (i === idx ? newSet : s)) ?? [],
    });
  };

  const handleRemoveSet = (idx: number) => api.updateValue({ sets: logExercise?.sets?.filter((_, i) => i !== idx) });

  return (
    <Tabs defaultValue="sets">
      <Tabs.List>
        <Tabs.Tab value="sets">Sets</Tabs.Tab>
        <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="sets" pt="xs">
        <Stack align="center" p="xs">
          {logExercise?.sets?.map((s, i) => (
            <Flex key={`${i}-${s.toString()}`}>
              {Object.entries(s.values).map(([name, value]) => (
                <SetCard
                  key={`${i}-${name}`}
                  name={name}
                  type={exercise.metrics.find((m) => m.name === name)?.type ?? "number"}
                  value={value}
                  onChange={(val) => handleUpdateSet(i, name, val)}
                  onRemove={() => handleRemoveSet(i)}
                />
              ))}
            </Flex>
          ))}

          <Button
            onClick={handleAddSet}
            size="compact-sm"
            variant="outline"
            color="blue"
            styles={{ root: { alignSelf: "stretch" } }}
          >
            <IconPlus />
          </Button>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="metrics" pt="xs">
        <>Metrics </>
      </Tabs.Panel>

      <Tabs.Panel value="history" pt="xs">
        <>History</>
      </Tabs.Panel>
    </Tabs>
  );
};

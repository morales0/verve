import { useDatabaseValue } from "@/api";
import { SetCard } from "@/components/ui";
import { useUser } from "@/context";
import { updateActiveSetsExercise } from "@/services/active-log.service";
import { LoggingSetsUserExercise, Set, SetsUserExercise, WithId } from "@/types/app.types";
import { Button, Flex, LoadingOverlay, Stack, Tabs } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export type SetsExerciseProps = {
  exercise: WithId<SetsUserExercise>;
};
export const SetsExercise = ({ exercise }: SetsExerciseProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { data: timestamp, isLoading: isTimestampLoading } = useDatabaseValue<string>(`activeLog/date`);
  const { data, isLoading } = useDatabaseValue<LoggingSetsUserExercise>(`activeLog/exercises/${exercise.id}`);

  if (isTimestampLoading || isLoading) {
    return <LoadingOverlay />;
  }

  if (!isLoading && !data) {
    navigate("/active-log");
  }

  const handleAddSet = () => {
    if (data?.sets) {
      updateActiveSetsExercise(user.uid, exercise.id, {
        sets: [...data.sets, data.sets.at(-1)!],
      });
    } else {
      const newSet: Set = {
        values: Object.fromEntries(exercise.metrics.map((m) => [m.name, 0])),
      };
      updateActiveSetsExercise(user.uid, exercise.id, { sets: [newSet] });
    }
  };

  const handleUpdateSet = (idx: number, name: string, value: string | number) => {
    const target = data?.sets?.at(idx);
    if (!target) return;

    const newSet = {
      ...target,
      values: {
        ...target.values,
        [name]: value,
      },
    };
    updateActiveSetsExercise(user.uid, exercise.id, {
      sets: data?.sets?.map((s, i) => (i === idx ? newSet : s)) ?? [],
    });
  };

  const handleRemoveSet = (idx: number) =>
    updateActiveSetsExercise(user.uid, exercise.id, { sets: data?.sets?.filter((_, i) => i !== idx) });

  return (
    <Tabs defaultValue="sets">
      <Tabs.List>
        <Tabs.Tab value="sets">Sets</Tabs.Tab>
        <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="sets" pt="xs">
        <Stack align="center" p="xs">
          {data?.sets?.map((s, i) => (
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

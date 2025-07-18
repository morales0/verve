import { CustomUserExercise } from "@/types/app.types";
import { Tabs } from "@mantine/core";

export type CustomExerciseProps = {
  exercise: CustomUserExercise;
};
export const CustomExercise = ({ exercise }: CustomExerciseProps) => {
  return (
    <Tabs defaultValue="metrics">
      <Tabs.List>
        <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
        <Tabs.Tab value="history">History</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="metrics" pt="xs">
        <>Metrics </>
      </Tabs.Panel>

      <Tabs.Panel value="history" pt="xs">
        <>History</>
      </Tabs.Panel>
    </Tabs>
  );
};

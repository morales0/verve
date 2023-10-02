import { Icon } from "@iconify/react";
import { ActionIcon, Button, Card, Divider, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { WorkoutExercise } from "../../../types/workout";

type Props = {
  exercises?: WorkoutExercise[];
  canEditExercise?: boolean;
  onEditExercise: (ex: WorkoutExercise) => void;
  onRemoveExercise: (ex: WorkoutExercise) => void;
  onCancel: () => void;
  onComplete: () => void;
};

const SummaryScreen = ({
  exercises,
  canEditExercise,
  onEditExercise,
  onRemoveExercise,
  onCancel,
  onComplete,
}: Props) => {
  return (
    <Stack justify="space-between" h="100%" sx={{ overflow: "hidden" }} spacing={0}>
      <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
        <ScrollArea>
          <Stack spacing="md">
            {exercises?.map((ex, i) => (
              <Card key={`summary-ex-${ex.id}`} withBorder shadow="xs">
                <Group position="apart" pb="xs">
                  <Text weight="bold">{ex.name}</Text>
                  <Group noWrap spacing="xs" position="center">
                    {canEditExercise && (
                      <ActionIcon color="indigo" variant="light" onClick={() => onEditExercise(ex)}>
                        <Icon icon="material-symbols:edit" />
                      </ActionIcon>
                    )}
                    <ActionIcon color="red" variant="light" onClick={() => onRemoveExercise(ex)}>
                      <Icon icon="ic:baseline-delete-forever" />
                    </ActionIcon>
                  </Group>
                </Group>
                <Divider />
                <Group pt="xs">
                  <Stack>
                    {ex.units.map((unit) => (
                      <Text key={`${ex.name}-${unit}`} fw="bold" fz="sm">
                        {unit}
                      </Text>
                    ))}
                  </Stack>
                  {ex.sets.map(({ values }, i) => {
                    return (
                      <Stack key={`${ex.name}-set-${i}`}>
                        {ex.units.map((unit) => (
                          <Text key={`${ex.name}-${unit}-set-${i}-val`}>{values[unit]}</Text>
                        ))}
                      </Stack>
                    );
                  })}
                </Group>
              </Card>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>

      <Divider />

      <Group w="100%" py="md" mt="auto" align="center" position="apart" grow>
        <Button
          size="sm"
          variant="light"
          color="red"
          sx={({ colors }) => ({ border: `1px solid ${colors.red[4]}` })}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button size="sm" color="teal" onClick={onComplete} disabled={!exercises}>
          Complete
        </Button>
      </Group>
    </Stack>
  );
};

export default SummaryScreen;

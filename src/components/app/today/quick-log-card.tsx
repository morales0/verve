import { QuickLogExercise, WithId } from "@/types/app.types";
import { ActionIcon, Badge, Card, Group, Modal, Text } from "@mantine/core";
import classes from "./today.module.css";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useFocusAreasMap } from "@/hooks/util";
import { useMemo } from "react";
import { QuickLogForm } from "@/components/forms";
import { useDisclosure } from "@mantine/hooks";
import { removeExerciseFromLog, updateLogExercise } from "@/services/log.service";
import { useUser } from "@/context";

export const QuickLogCard = (exercise: WithId<QuickLogExercise>) => {
  const { dataRef } = useUser()
  const { name, focusAreaIds, id } = exercise;
  const focusAreasMap = useFocusAreasMap();
  const focusAreas = useMemo(() => focusAreaIds?.map((id) => focusAreasMap[id]), [focusAreasMap, focusAreaIds]);

  const [opened, { open, close }] = useDisclosure(false);

  const onRemove = () => removeExerciseFromLog(dataRef, id)
  const handleSubmit = async (updates: Partial<QuickLogExercise>) => {
    await updateLogExercise(dataRef, id, updates);
    close()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Quick Log" centered>
        <QuickLogForm onSubmit={handleSubmit} initialValues={exercise} />
      </Modal>
      <Card className={classes.exerciseCard} p="xs" radius="md">
        <Group justify="space-between">
          <Text fw={500} size="sm">
            {name}
          </Text>
          <Group gap="xs">
            <ActionIcon onClick={open}>
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon onClick={onRemove}>
              <IconTrash color="pink" size={16} />
            </ActionIcon>
          </Group>
        </Group>
        <Group gap="xs" mt="md">
          {focusAreas?.map((area) => (
            <Badge key={area} variant="light" color="violet" size="xs">
              {area}
            </Badge>
          ))}
        </Group>
      </Card>
    </>
  );
};

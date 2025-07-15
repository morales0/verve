import { ActionIcon, Badge, Box, Flex, Group, Menu, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconDots, IconDotsVertical, IconEdit, IconMinus, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { NewExerciseForm } from "@/components/forms";
import { useFocusAreasMap, useTagsMap } from "@/hooks/util";
import { UserExercise, WithId } from "@/types/app.types";

export type ListExerciseProps = {
  exercise: WithId<UserExercise>;
  started?: boolean;
  onEdit: (updates: Partial<Omit<WithId<UserExercise>, "id">>) => Promise<void>;
  onDelete: () => Promise<void>;
  onStart?: () => any;
};

export const ExerciseCard = ({ exercise, started, onEdit, onDelete, onStart }: ListExerciseProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const areasMap = useFocusAreasMap();
  const tagsMap = useTagsMap();

  const parsedFocusAreas = exercise.focusAreaIds
    ?.map((a) => ({ key: a, value: areasMap[a] }))
    .filter((a) => a.value !== undefined);
  const parsedTags = exercise.tagIds?.map((t) => ({ key: t, value: tagsMap[t] })).filter((t) => t.value !== undefined);

  const handleSubmit = (updates: Partial<Omit<UserExercise, "id">>) => onEdit(updates).then(() => close());

  return (
    <>
      <Modal opened={opened} onClose={close} title={`Edit "${exercise.name}" Exercise`} centered>
        <NewExerciseForm
          onSubmit={handleSubmit}
          initialValues={{
            ...exercise,
            focusAreaIds: parsedFocusAreas?.map((a) => a.key),
            tagIds: parsedTags?.map((t) => t.value),
          }}
        />
      </Modal>
      <Flex p="sm" gap="xs" align="center">
        <Stack align="flex-start" gap="xs" style={{ flexGrow: 1, cursor: "pointer" }} onClick={onStart}>
          <Flex align="center" gap="xs">
            <Text>{exercise.name}</Text>
            <Badge size="xs" color="gray" variant="light">
              {exercise.type}
            </Badge>
          </Flex>
          <Group gap="xs">
            {parsedFocusAreas?.map((area) => (
              <Badge key={area.key} variant="outline" color="violet" size="sm">
                {area.value}
              </Badge>
            ))}
          </Group>
        </Stack>
        <Menu>
          <Menu.Target>
            <ActionIcon ml="auto">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconEdit size={14} />} onClick={open}>
              Edit
            </Menu.Item>

            <Menu.Item color="red" leftSection={<IconMinus size={14} />} onClick={onDelete}>
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </>
  );
};

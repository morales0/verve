import { ActionIcon, Badge, Box, Flex, Group, Menu, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconDots, IconEdit, IconMinus, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ExerciseForm } from "./exercise-form";
import { useFocusAreasMap, useTagsMap } from "@/hooks/util";
import { UserExercise, WithId } from "@/types/app.types";

export type ListExerciseProps = WithId<UserExercise> & {
  started?: boolean;
  onEdit: (updates: Partial<Omit<WithId<UserExercise>, "id">>) => Promise<void>;
  onDelete: () => Promise<void>;
  onStart?: () => any;
};

export const ListExercise = ({
  id,
  name,
  focusAreaIds,
  tagIds,
  type,
  started,
  onEdit,
  onDelete,
  onStart,
}: ListExerciseProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const areasMap = useFocusAreasMap();
  const tagsMap = useTagsMap();

  const parsedFocusAreas = focusAreaIds
    ?.map((a) => ({ key: a, value: areasMap[a] }))
    .filter((a) => a.value !== undefined);
  const parsedTags = tagIds?.map((t) => ({ key: t, value: tagsMap[t] })).filter((t) => t.value !== undefined);

  const handleSubmit = (updates: Partial<Omit<UserExercise, "id">>) => onEdit(updates).then(() => close());

  return (
    <>
      <Modal opened={opened} onClose={close} title={`Edit "${name}" Exercise`} centered>
        <ExerciseForm
          onSubmit={handleSubmit}
          initialValues={{
            name,
            type,
            focusAreaIds: parsedFocusAreas?.map((a) => a.key),
            tagIds: parsedTags?.map((t) => t.value),
          }}
        />
      </Modal>
      <Stack p="sm" gap="xs">
        <Flex justify="space-between">
          <Flex align="center" gap="sm">
            <Text>{name}</Text>
            <Badge size="xs" color="gray" variant="light">
              {type}
            </Badge>
          </Flex>

          <Group>
            <Menu>
              <Menu.Target>
                <ActionIcon>
                  <IconDots />
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
            <ActionIcon onClick={onStart}>
              {started ? <IconArrowRight stroke={1} /> : <IconPlus stroke={1} />}
            </ActionIcon>
          </Group>
        </Flex>
        <Group gap="xs">
          {parsedFocusAreas?.map((area) => (
            <Badge key={area.key} variant="light" color="violet" size="xs">
              {area.value}
            </Badge>
          ))}
        </Group>
      </Stack>
    </>
  );
};

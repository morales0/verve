import { useFocusAreas, useRecentLogs } from "@/api";
import { useUser } from "@/context";
import { calculateFocusAreaLevel } from "@/functions";
import { addFocusArea, updateFocusArea } from "@/services/focus-areas.service";
import { ActionIcon, Button, Flex, Group, Loader, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { FocusAreaBadge } from "./focus-area-badge";

export const FocusAreas = () => {
  const { dataRef } = useUser();
  const { data: last7DaysLogs, status: logsStatus } = useRecentLogs({ select: (data) => Object.values(data) });

  // Focus areas local state
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");

  // Find last log that uses focus area with id and is complete
  const calcLevel = useCallback(
    (id: string) => calculateFocusAreaLevel(last7DaysLogs?.findLast(({ focusAreaIds }) => focusAreaIds?.includes(id))),
    [last7DaysLogs]
  );

  // create data to iterate
  const { data: focusAreas, status } = useFocusAreas({
    select: (data) =>
      Object.values(data)
        .filter(({ archived }) => !archived)
        .map((area) => ({
          ...area,
          label: area.name,
          value: area.id,
          level: calcLevel(area.id) as 0 | 1 | 2,
        })),
  });

  // util functions
  const doesNameExist = (value: string) => !!focusAreas?.some(({ name }) => name.toLowerCase() === value.toLowerCase());

  const isNameArchived = (value: string) =>
    !!focusAreas?.some(({ name, archived }) => name.toLowerCase() === value.toLowerCase() && archived);

  // handlers
  const handleAddFocusArea = async (value: string) => addFocusArea(dataRef, value);

  const handleUpdateAreaName = async (id: string, value: string) => updateFocusArea(dataRef, id, { name: value });

  const handleArchiveFocusArea = async (id: string) => updateFocusArea(dataRef, id, { archived: true });

  const handleUnarchiveFocusArea = async (value: string) => {
    // First find focus area with value as name
    const id = focusAreas?.find((area) => area.name.toLowerCase() === value.toLowerCase())?.id;

    if (!id) {
      return;
    }

    await updateFocusArea(dataRef, id, { archived: false });
    setName("");
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Focus Area" centered>
        <Stack>
          <TextInput label="Name" value={name} onChange={(event) => setName(event.currentTarget.value)} />
          <Group mt="md">
            {isNameArchived(name) && <Button onClick={() => handleUnarchiveFocusArea(name)}>Unarchive</Button>}
            {!isNameArchived(name) && (
              <Button disabled={doesNameExist(name)} onClick={() => handleAddFocusArea(name)}>
                Add
              </Button>
            )}
            <Button color="red" onClick={close}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack gap="xs">
        <Flex align="center" justify="space-between">
          <Text size="xs" tt="uppercase" fw={500} ff="heading">
            Focus Areas
          </Text>

          <Group gap="xs">
            <ActionIcon size="sm" color="default" onClick={open}>
              <IconPlus stroke={1.5} size={20} />
            </ActionIcon>
            {/*
            // todo: active once area page is created
            <ActionIcon size="sm" color="default">
              <IconArrowRight stroke={1.5} size={20} />
            </ActionIcon>
            */}
          </Group>
        </Flex>

        <Flex wrap="wrap" gap="xs" justify="space-evenly">
          {status === "pending" && <Loader />}
          {status === "success" &&
            (focusAreas.map((area) => (
              <FocusAreaBadge
                key={area.id}
                {...area}
                doesNameExist={doesNameExist}
                onArchive={() => handleArchiveFocusArea(area.id)}
                onUpdateName={(value: string) => handleUpdateAreaName(area.id, value)}
              />
            )) ?? (
              <Text c="dimmed" size="xs">
                No active focus areas
              </Text>
            ))}
        </Flex>
      </Stack>
    </>
  );
};

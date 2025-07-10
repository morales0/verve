import { useFocusAreas, useUser } from "@/context";
import { calculateFocusAreaLevel } from "@/functions";
import { getLast7DaysLogs } from "@/services/log.service";
import { LogExercise, WithId } from "@/types/app.types";
import { ActionIcon, Button, Flex, Group, Loader, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { FocusAreaBadge } from "./focus-area-badge";

export const FocusAreas = () => {
  const { dataRef } = useUser();
  const focusAreas = useFocusAreas();
  const { api } = focusAreas;

  // Subscribe to last seven days log
  const [last7DaysLogs, setLast7DaysLogs] = useState<WithId<LogExercise>[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!dataRef) return;
    const off = getLast7DaysLogs(dataRef, setLast7DaysLogs, setLoading);
    return () => off();
  }, [dataRef]);

  // Focus areas local state
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");

  // Find last log that uses focus area with id and is complete
  const calcLevel = useCallback(
    (id: string) => calculateFocusAreaLevel(last7DaysLogs.findLast(({ focusAreaIds }) => focusAreaIds?.includes(id))),
    [last7DaysLogs]
  );

  // create data to iterate
  const data =
    focusAreas.data
      ?.filter(({ archived }) => !archived)
      .map((area) => ({
        ...area,
        label: area.name,
        value: area.id,
        level: calcLevel(area.id) as 0 | 1 | 2,
      })) ?? [];

  // util functions
  const doesNameExist = (value: string) =>
    focusAreas.data.some(({ name }) => name.toLowerCase() === value.toLowerCase());

  const isNameArchived = (value: string) =>
    focusAreas.data.some(({ name, archived }) => name.toLowerCase() === value.toLowerCase() && archived);

  // handlers
  const handleAddFocusArea = async (value: string) =>
    api
      .addChild({
        name: value,
      })
      .then(() => {
        setName("");
        close();
      });

  const handleUpdateAreaName = async (id: string, value: string) =>
    api.updateChild(id, {
      name: value,
    });

  const handleArchiveFocusArea = async (id: string) =>
    api.updateChild(id, {
      archived: true,
    });

  const handleUnarchiveFocusArea = async (value: string) => {
    // First find focus area with value as name
    const id = focusAreas.data.find((area) => area.name.toLowerCase() === value.toLowerCase())?.id;

    if (!id) {
      return;
    }

    return api
      .updateChild(id, {
        archived: false,
      })
      .then(() => {
        setName("");
        close();
      });
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
          {loading && <Loader />}
          {!loading &&
            (data?.map((area) => (
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

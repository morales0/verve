import { FocusArea, useFocusAreas } from "@/hooks/use-focus-areas.hook";
import { ActionIcon, Button, Flex, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { FocusAreaBadge, FocusAreaWithDays } from "./focus-area-badge";

const calcDays = (area: FocusArea) => {
  if (area.lastUsed) {
    const now = new Date();
    const dateLastUsed = new Date(area.lastUsed);
    return Math.floor((now.getTime() - dateLastUsed.getTime()) / 86400000);
  }

  return Infinity;
};

export const FocusAreas = () => {
  const focusAreas = useFocusAreas();
  const { api } = focusAreas;

  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");

  const data: FocusAreaWithDays[] =
    focusAreas.data
      ?.filter(({ archived }) => !archived)
      .map((area) => ({
        ...area,
        label: area.name,
        value: area.id,
        days: calcDays(area),
      })) ?? [];

  const doesNameExist = (value: string) =>
    focusAreas.data.some(({ name }) => name.toLowerCase() === value.toLowerCase());

  const isNameArchived = (value: string) =>
    focusAreas.data.some(({ name, archived }) => name.toLowerCase() === value.toLowerCase() && archived);

  const handleAddFocusArea = (value: string) => {
    if (doesNameExist(value)) {
      return;
    }

    return api
      .addChild({
        name,
      })
      .then(() => {
        setName("");
        close();
      });
  };

  const handleUpdateAreaName = (id: string, newName: string) => {
    if (doesNameExist(newName)) {
      return;
    }

    return api.updateChild(id, {
      name: newName,
    });
  };

  const handleArchiveFocusArea = (id: string) => {
    return api.updateChild(id, {
      archived: true,
    });
  };

  const handleUnarchiveFocusArea = (name: string) => {
    const id = focusAreas.data.find((area) => area.name.toLowerCase() === name.toLowerCase())?.id;

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
            <ActionIcon size="sm" color="default">
              <IconArrowRight stroke={1.5} size={20} />
            </ActionIcon>
          </Group>
        </Flex>

        <Flex wrap="wrap" gap="xs" justify="space-evenly">
          {data?.map((area) => (
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
          )}
        </Flex>
      </Stack>
    </>
  );
};

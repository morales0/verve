import { MuscleGroup } from "@/types/workout";
import { Badge, Modal, Button, Stack, Text, Group, TextInput } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { on } from "events";
import { useState } from "react";

const calcDays = (group: MuscleGroup) => {
  if (group.dateLastUsed) {
    const now = new Date();
    const dateLastUsed = new Date(group.dateLastUsed);
    return Math.floor((now.getTime() - dateLastUsed.getTime()) / 86400000);
  }

  return undefined;
};

export type GroupBadgeProps = {
  group: MuscleGroup;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

export const GroupBadge = ({ group, onDelete, onUpdate }: GroupBadgeProps) => {
  const largeScreen = useMediaQuery("(min-width: 900px)");
  const [opened, { open, close }] = useDisclosure(false);
  const [newName, setNewName] = useState("");

  const daysSince = calcDays(group) ?? 99;
  const color = daysSince <= 4 ? "teal" : daysSince <= 6 ? "yellow" : daysSince <= 7 ? "pink" : "gray";

  const handleEdit = () => {
    onUpdate(group.id ?? group.name, newName);
    setNewName("");
  };

  const handleDelete = () => {
    onDelete(group.id ?? group.name);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered title={group.name}>
        <Stack>
          <Text>
            <Text span fw={500}>
              Last used:{" "}
            </Text>
            <Text span c={color}>
              {group.dateLastUsed ? `${daysSince} day(s) ago` : "Never"}
            </Text>
          </Text>
          <TextInput value={newName} onChange={(e) => setNewName(e.target.value)} label="Change name" />
          <Group justify="space-evenly">
            <Button onClick={handleEdit} disabled={newName === ""}>
              Update name
            </Button>
            <Button onClick={handleDelete} color="red">
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Badge
        component="button"
        onClick={open}
        color={color}
        variant={"light"}
        radius={"md"}
        size={largeScreen ? "lg" : "md"}
      >
        {group.name}
      </Badge>
    </>
  );
};

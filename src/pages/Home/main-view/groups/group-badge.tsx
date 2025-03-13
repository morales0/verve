import { MuscleGroup } from "@/types/workout";
import { Badge, BadgeProps, Button, Group, Modal, Stack, Text, TextInput, useComputedColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPlant2, IconPoint, IconPointFilled } from "@tabler/icons-react";
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
  const colorScheme = useComputedColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [newName, setNewName] = useState("");

  const daysSince = calcDays(group) ?? 99;
  const darkColor = colorScheme === "dark" ? "dark.1" : "dark.3";
  const color = daysSince <= 3 ? "teal" : daysSince <= 5 ? "yellow" : daysSince <= 6 ? "pink" : darkColor;

  const handleEdit = () => {
    onUpdate(group.id ?? group.name, newName);
    setNewName("");
  };

  const handleDelete = () => {
    onDelete(group.id ?? group.name);
    close();
  };

  const badgeProps: Partial<BadgeProps> = {
    color,
    variant: daysSince <= 3 ? "filled" : "light",
    leftSection:
      daysSince <= 3 ? (
        <IconPlant2 size={16} />
      ) : daysSince <= 6 ? (
        <IconPointFilled size={16} />
      ) : (
        <IconPoint size={16} />
      ),
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
      <Badge component="button" onClick={open} {...badgeProps} size={largeScreen ? "lg" : "md"} maw="50%">
        {group.name}
      </Badge>
    </>
  );
};

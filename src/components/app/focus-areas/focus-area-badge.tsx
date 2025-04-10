import { FocusArea, WithId } from "@/types/app.types";
import { Badge, Button, Group, Modal, Stack, Text, TextInput, useComputedColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlant2, IconPoint, IconPointFilled } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export type FocusAreaBadgeProps = WithId<FocusArea> & {
  level: 1 | 2 | 0;
  onArchive: () => Promise<string>;
  onUpdateName: (name: string) => Promise<string> | undefined;
  doesNameExist: (name: string) => boolean;
};

export const FocusAreaBadge = ({ level, onArchive, onUpdateName, doesNameExist, ...area }: FocusAreaBadgeProps) => {
  const colorScheme = useComputedColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [newName, setNewName] = useState("");

  const handleArchive = () => {
    onArchive().then(() => {
      close();
    });
  };

  const handleSave = (value: string) => {
    onUpdateName(value)?.then(() => {
      setNewName("");
    });
  };

  const badgeProps = useMemo(() => {
    if (level === 2) {
      return { color: "violet", variant: "filled", leftSection: <IconPlant2 size={16} /> };
    } else if (level === 1) {
      return { color: "cyan", variant: "light", leftSection: <IconPointFilled size={16} /> };
    } else {
      return {
        color: colorScheme === "dark" ? "gray.3" : "dark.3",
        variant: "light",
        leftSection: <IconPoint size={16} />,
      };
    }
  }, [level, colorScheme]);

  return (
    <>
      <Badge onClick={open} style={{ flexGrow: 1 }} maw="40%" {...badgeProps}>
        {area.name}
      </Badge>
      <Modal opened={opened} onClose={close} title={area.name} centered>
        <Stack>
          <Text>Used in last seven days: {level && level > 1 ? "Yes" : "No"}</Text>
          <TextInput label="Name" value={newName} onChange={(event) => setNewName(event.currentTarget.value)} />
          <Group mt="md">
            <Button color="pink" onClick={handleArchive}>
              Archive
            </Button>
            <Button disabled={doesNameExist(newName)} onClick={() => handleSave(newName)}>
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

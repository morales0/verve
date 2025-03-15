import { FocusArea } from "@/hooks/use-focus-areas.hook";
import { Badge, Button, Group, Modal, Stack, Text, TextInput, useComputedColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlant2, IconPoint, IconPointFilled } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export type FocusAreaWithDays = FocusArea & {
  days?: number;
};

export type FocusAreaBadgeProps = FocusAreaWithDays & {
  onArchive: () => Promise<string>;
  onUpdateName: (name: string) => Promise<string> | undefined;
  doesNameExist: (name: string) => boolean;
};

export const FocusAreaBadge = ({ onArchive, onUpdateName, doesNameExist, ...props }: FocusAreaBadgeProps) => {
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
    if (props.days !== undefined) {
      if (props.days <= 3) {
        return { color: "violet", variant: "filled", leftSection: <IconPlant2 size={16} /> };
      } else if (props.days <= 5) {
        return { color: "cyan", variant: "light", leftSection: <IconPointFilled size={16} /> };
      } else {
        return {
          color: colorScheme === "dark" ? "gray.3" : "dark.3",
          variant: "light",
          leftSection: <IconPoint size={16} />,
        };
      }
    }
    return {};
  }, [props]);

  return (
    <>
      <Badge onClick={open} style={{ flexGrow: 1 }} maw="40%" {...badgeProps}>
        {props.name}
      </Badge>
      <Modal opened={opened} onClose={close} title={props.name} centered>
        <Stack>
          <Text>Days since last used: {props.days}</Text>
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

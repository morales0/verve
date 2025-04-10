import { Card, Group, ActionIcon, Menu, Badge, Text } from "@mantine/core";
import { IconChevronDown, IconDotsVertical, IconEdit, IconMinus } from "@tabler/icons-react";
import classes from "./today.module.css";
import { LogExercise } from "@/types/app.types";

export type LogCardProps = LogExercise & {
  name: string;
  focusAreas: string[];
  onRemove: () => Promise<any>;
};

export const LogCard = ({ name, status, focusAreas, onRemove }: LogCardProps) => {
  return (
    <Card className={classes.exerciseCard} p="xs" radius="md" data-complete={status === "complete"}>
      <Group justify="space-between">
        <Text fw={500} size="sm">
          {name}
        </Text>
        <Group gap="xs">
          <ActionIcon>
            <IconChevronDown size={16} />
          </ActionIcon>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEdit size={14} />}>Edit</Menu.Item>

              <Menu.Divider />

              <Menu.Item color="red" leftSection={<IconMinus size={14} />} onClick={onRemove}>
                Remove
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
  );
};

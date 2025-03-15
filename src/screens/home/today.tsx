import { useHistory } from "@/hooks/use-history.hook";
import { ActionIcon, Badge, Card, Group, Menu, Stack, Text } from "@mantine/core";
import { IconChevronDown, IconDotsVertical, IconEdit, IconMinus } from "@tabler/icons-react";
import classes from "./today.module.css";

export const Today = () => {
  const { data, loading, api } = useHistory();

  const handleRemoveExercise = (exerciseId: string) => {
    api.removeChild(exerciseId);
  };

  return (
    <>
      <Text size="xs" tt="uppercase" fw={500} ff="heading" mx="auto">
        Today
      </Text>
      <Stack gap="md">
        {data.length ? (
          data.map((exercise) => (
            <Card key={exercise.id} className={classes.exerciseCard} p="xs" radius="md">
              <Group justify="space-between">
                <Text fw={500} size="sm">
                  {exercise.name}
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

                      <Menu.Item
                        color="red"
                        leftSection={<IconMinus size={14} />}
                        onClick={() => handleRemoveExercise(exercise.id)}
                      >
                        Remove
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
              <Group gap="xs" mt="md">
                {exercise.focusAreas?.map((area, index) => (
                  <Badge key={area} variant="light" color="violet" size="xs">
                    {area}
                  </Badge>
                ))}
              </Group>
            </Card>
          ))
        ) : (
          <Text size="sm" c="dimmed" ta="center">
            Lots of space to get started!
          </Text>
        )}
      </Stack>
    </>
  );
};

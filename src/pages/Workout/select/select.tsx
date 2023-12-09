import useUserExercises from "@/hooks/userExercises.hook";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

export type SelectProps = {
  onReturn: () => void;
  onStartExercise: () => void;
};

export const Select = ({ onReturn, onStartExercise }: SelectProps) => {
  const { status, data: userExercises, api } = useUserExercises();
  const [filterOption, setFilterOption] = useState<"filter" | "sort" | undefined>(undefined);

  console.log(userExercises);
  return (
    <Stack h="100%" sx={{ overflow: "hidden" }} gap={0}>
      <Flex align="center" gap="xs" w="100%" py="xs" px="xs">
        <ActionIcon size="lg" radius="sm" variant="light" color="gray">
          <Icon icon="icon-park-outline:return" />
        </ActionIcon>
        <TextInput variant="unstyled" placeholder="Search or create..." sx={{ flexGrow: 1 }} />
        <ActionIcon size="lg" radius="sm" variant="light" color="teal">
          <Icon icon="mdi:plus" />
        </ActionIcon>
        <ActionIcon
          size="lg"
          radius="sm"
          variant={filterOption === "filter" ? "filled" : "light"}
          color="blue"
          onClick={() => setFilterOption((prev) => (prev === "filter" ? undefined : "filter"))}
        >
          <Icon icon="mdi:filter-outline" />
        </ActionIcon>
        <ActionIcon
          size="lg"
          radius="sm"
          variant={filterOption === "sort" ? "filled" : "light"}
          color="blue"
          onClick={() => setFilterOption((prev) => (prev === "sort" ? undefined : "sort"))}
        >
          <Icon icon="iconoir:sort" />
        </ActionIcon>
      </Flex>

      <Divider />

      {filterOption !== undefined && (
        <Flex sx={{ overflowX: "auto", "& > *": { flexShrink: 0 } }} align="center" gap="md" p="sm">
          {filterOption === "sort" ? (
            <>
              <Badge size="lg" color="gray.3" c="gray" variant="outline">
                Most Used
              </Badge>
              <Badge size="lg" color="gray.3" c="gray" variant="outline">
                Last Used
              </Badge>
              <Badge size="lg" color="gray.3" c="gray" variant="outline">
                Recently Added
              </Badge>
            </>
          ) : (
            <>
              <Badge size="lg" color="gray.3" c="gray" variant="outline">
                Chest
              </Badge>
              <Badge size="lg" color="gray.3" c="gray" variant="outline">
                Barbell
              </Badge>
              <Badge size="lg" color="gray.3" c="gray" variant="outline">
                Dumbbell
              </Badge>
            </>
          )}
        </Flex>
      )}

      <Stack gap="xs" px="xs" py="sm" sx={{ overflow: "auto" }}>
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error loading exercises</div>}
        {status === "success" && (
          <>
            <Flex justify="space-between">
              <Checkbox />
              <Text color="dimmed" fz="sm">
                Showing # of {userExercises.length} exercises
              </Text>
            </Flex>

            {userExercises?.map(({ id, name, weightType, primaryMuscleGroups, secondaryMuscleGroups }) => (
              <Checkbox
                key={id || name}
                color="teal"
                styles={{
                  body: { width: "100%", alignItems: "center", gap: 0 },
                  labelWrapper: { flexGrow: 1 },
                  label: { cursor: "pointer" },
                  input: { cursor: "pointer" },
                }}
                label={
                  <Paper withBorder px="xs" py={6} radius="sm">
                    <Flex justify="space-between">
                      <Flex align="baseline" gap="xs">
                        <Text fw={500} fz="md">
                          {name}
                        </Text>
                        {weightType && (
                          <Text italic fw={500} color="dimmed" fz="xs" span>
                            {" "}
                            {weightType}
                          </Text>
                        )}
                      </Flex>

                      <Menu shadow="md" position="left">
                        <Menu.Target>
                          <ActionIcon variant="transparent" color="violet.4">
                            <Icon icon="fluent:options-20-regular" width={24} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item color="indigo" icon={<Icon icon="material-symbols:edit" />}>
                            Edit
                          </Menu.Item>
                          <Menu.Item color="red" icon={<Icon icon="ic:baseline-delete-forever" />}>
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Flex>

                    <Flex justify="space-between">
                      <Flex>
                        {primaryMuscleGroups && (
                          <Text fz="xs" fw={400}>
                            {Object.values(primaryMuscleGroups).join(", ")}
                          </Text>
                        )}
                        {secondaryMuscleGroups && (
                          <Text fz="xs" color="dimmed" fw={400}>
                            {", "}
                            {Object.values(secondaryMuscleGroups).join(", ")}
                          </Text>
                        )}
                      </Flex>

                      <Text fz="xs" color="cyan.7">
                        3 days ago
                      </Text>
                    </Flex>
                  </Paper>
                }
              />
            ))}
          </>
        )}
      </Stack>

      <Divider mt="auto" />

      <Group w="100%" py="md" px="xs" align="center" position="apart" grow>
        <Button size="sm" variant="light" color="red" onClick={onReturn}>
          Cancel
        </Button>
        <Button size="sm" color="blue.4" onClick={onStartExercise}>
          Start
        </Button>
      </Group>
    </Stack>
  );
};

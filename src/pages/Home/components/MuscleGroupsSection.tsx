import { Icon } from "@iconify/react";
import { ActionIcon, Group, Indicator, Popover, Skeleton, Text } from "@mantine/core";
import useMuscleGroups from "../../../hooks/muscleGroups.hook";
import { STATUS } from "../../../types/util";
import MuscleGroupTag from "./MuscleGroupTag";

const MuscleGroupsSection = () => {
  const { status, data: groups } = useMuscleGroups();

  if (status === STATUS.SUCCESS && groups.length === 0) {
    return <Text>You have no muscle groups defined</Text>;
  }

  return (
    <>
      <Group
        position="center"
        spacing={"sm"}
        pos="relative"
        px="35px"
        sx={{
          "&>*": {
            flex: "1 1 auto",
          },
        }}
      >
        {status === STATUS.LOADING && (
          <>
            <Skeleton h={20} w={120} radius="md" />
            <Skeleton h={20} w={120} radius="md" />
            <Skeleton h={20} w={120} radius="md" />
            <Skeleton h={20} w={120} radius="md" />
            <Skeleton h={20} w={120} radius="md" />
          </>
        )}

        {status === STATUS.SUCCESS && groups.map((group, i) => <MuscleGroupTag key={`group-${i}`} group={group} />)}

        <Popover width={200} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <ActionIcon size={26} radius="xl" variant="filled" color="cyan" pos="absolute" top="0" right="0">
              <Icon icon="bi:info" />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Indicator color="teal" position="middle-end">
              <Text size="sm" color="dimmed">
                Last 4 days
              </Text>
            </Indicator>
            <Indicator color="yellow" position="middle-end">
              <Text size="sm" color="dimmed">
                Last 6 days
              </Text>
            </Indicator>
            <Indicator color="pink" position="middle-end">
              <Text size="sm" color="dimmed">
                Last 8 days
              </Text>
            </Indicator>
            <Indicator color="gray" position="middle-end">
              <Text size="sm" color="dimmed">
                More than 8 days
              </Text>
            </Indicator>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </>
  );
};

export default MuscleGroupsSection;

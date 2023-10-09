import { Group, Paper, Skeleton, Text } from "@mantine/core";
import useMuscleGroups from "../../../hooks/muscleGroups.hook";
import { STATUS } from "../../../types/util";
import MuscleGroupTag from "./MuscleGroupTag";

const MuscleGroupsSection = () => {
  const { status, data: groups } = useMuscleGroups();

  if (status === STATUS.SUCCESS && groups.length === 0) {
    return <Text>You have no muscle groups defined</Text>;
  }

  return (
    <Paper py="sm" px="xl" radius={0} withBorder sx={(theme) => ({ borderRight: "none", borderLeft: "none" })}>
      <Group
        position="center"
        spacing={"sm"}
        pos="relative"
        sx={{
          "&>*": {
            flex: "1 1 auto",
          },
        }}
      >
        {status === STATUS.LOADING && (
          <>
            <Skeleton h={10} w={80} radius="md" />
            <Skeleton h={10} w={80} radius="md" />
            <Skeleton h={10} w={80} radius="md" />
            <Skeleton h={10} w={80} radius="md" />
            <Skeleton h={10} w={80} radius="md" />
            <Skeleton h={10} w={80} radius="md" />
          </>
        )}

        {status === STATUS.SUCCESS && groups.map((group, i) => <MuscleGroupTag key={`group-${i}`} group={group} />)}
      </Group>
    </Paper>
  );
};

export default MuscleGroupsSection;

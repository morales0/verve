import { Flex, Skeleton, Text } from "@mantine/core";
import useMuscleGroups from "../../../../hooks/muscleGroups.hook";
import { STATUS } from "../../../../types/util";
import { GroupBadge } from "./group-badge";
import classes from "./groups.module.css";

const GroupSkeleton = () => (
  <>
    <Skeleton h={10} w={80} radius="md" />
    <Skeleton h={10} w={80} radius="md" />
    <Skeleton h={10} w={80} radius="md" />
    <Skeleton h={10} w={80} radius="md" />
    <Skeleton h={10} w={80} radius="md" />
    <Skeleton h={10} w={80} radius="md" />
  </>
);

export const Groups = () => {
  const { status, data: groups } = useMuscleGroups();

  if (status === STATUS.SUCCESS && groups.length === 0) {
    return <Text>You have no muscle groups defined</Text>;
  }

  return (
    <Flex align="center" wrap="wrap" gap="sm" className={classes.root}>
      {status === STATUS.LOADING && <GroupSkeleton />}
      {status === STATUS.SUCCESS && groups.map((group, i) => <GroupBadge key={`group-${i}`} group={group} />)}
    </Flex>
  );
};

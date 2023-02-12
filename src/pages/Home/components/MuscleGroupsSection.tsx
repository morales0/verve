import { Group, Divider, Text } from "@mantine/core";
import useMuscleGroups from "../../../hooks/muscleGroups.hook";
import { STATUS } from "../../../types/util";
import MuscleGroupTag from "./MuscleGroupTag";

const groups = [
  {
    name: "Shoulders",
    days: 1,
  },
  {
    name: "Triceps",
    days: 4,
  },
  {
    name: "Biceps",
    days: 1,
  },
  {
    name: "Back",
    days: 15,
  },
  {
    name: "Legs",
    days: 1,
  },
  {
    name: "Chest",
    days: 15,
  },
  {
    name: "Glutes",
    days: 6,
  },
  {
    name: "Core",
    days: 3,
  },
];

type Props = any;

const MuscleGroupsSection = (props: Props) => {
  const { status, data: groups } = useMuscleGroups();

  if (status === STATUS.LOADING) {
    return <Text>Loading muscle groups</Text>;
  }

  if (groups.length === 0) {
    return <Text>You have no muscle groups defined</Text>;
  }

  return (
    <>
      <Group position="center" spacing={"sm"}>
        {groups.map((group, i) => (
          <MuscleGroupTag key={`group-${i}`} group={group} />
        ))}
      </Group>
    </>
  );
};

export default MuscleGroupsSection;

import { Group, Divider } from "@mantine/core";
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

type Props = {};

const MuscleGroupsSection = (props: Props) => {
  return (
    <>
      <Group position="center" spacing={"sm"}>
        {groups.map((group, i) => (
          <MuscleGroupTag key={`group-${i}`} group={group} />
        ))}
      </Group>
      <Divider mb={"1rem"} />
    </>
  );
};

export default MuscleGroupsSection;

import { Badge } from "@mantine/core";

type MuscleGroupTagProps = {
  group: { name: string; days: number };
};

const MuscleGroupTag = ({ group }: MuscleGroupTagProps) => {
  const color = group.days <= 3 ? "red" : group.days <= 6 ? "violet" : "gray";

  return (
    <Badge color={color} variant={"filled"} radius={"md"} size={"lg"}>
      {group.name}
    </Badge>
  );
};

export default MuscleGroupTag;

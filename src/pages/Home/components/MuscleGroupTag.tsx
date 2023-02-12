import { Badge } from "@mantine/core";
import { MuscleGroup } from "../../../types/workout";

const MuscleGroupTag = ({ group }: { group: MuscleGroup }) => {
  const calcColor = () => {
    if (group.dateLastUsed) {
      const now = new Date();
      const dateLastUsed = new Date(group.dateLastUsed);
      const daysSince = Math.floor((now.getTime() - dateLastUsed.getTime()) / 86400000);
      return daysSince <= 4 ? "red" : daysSince <= 7 ? "violet" : "gray";
    } else {
      return "gray";
    }
  };

  return (
    <Badge color={calcColor()} variant={"filled"} radius={"md"} size={"lg"}>
      {group.name}
    </Badge>
  );
};

export default MuscleGroupTag;

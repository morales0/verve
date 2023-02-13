import { Badge } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MuscleGroup } from "../../../types/workout";

const MuscleGroupTag = ({ group }: { group: MuscleGroup }) => {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  const calcColor = () => {
    if (group.dateLastUsed) {
      const now = new Date();
      const dateLastUsed = new Date(group.dateLastUsed);
      const daysSince = Math.floor((now.getTime() - dateLastUsed.getTime()) / 86400000);
      return daysSince <= 4 ? "teal" : daysSince <= 6 ? "violet" : daysSince <= 8 ? "blue" : "gray";
    } else {
      return "gray";
    }
  };

  return (
    <Badge color={calcColor()} variant={"light"} radius={"md"} size={largeScreen ? "lg" : "sm"}>
      {group.name}
    </Badge>
  );
};

export default MuscleGroupTag;

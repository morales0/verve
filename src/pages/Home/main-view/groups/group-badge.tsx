import { MuscleGroup } from "@/types/workout";
import { Badge } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const calcDays = (group: MuscleGroup) => {
  if (group.dateLastUsed) {
    const now = new Date();
    const dateLastUsed = new Date(group.dateLastUsed);
    return Math.floor((now.getTime() - dateLastUsed.getTime()) / 86400000);
  }

  return undefined;
};

export const GroupBadge = ({ group }: { group: MuscleGroup }) => {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  const daysSince = calcDays(group) ?? 99;
  const color = daysSince <= 4 ? "teal" : daysSince <= 6 ? "yellow" : daysSince <= 7 ? "pink" : "gray";

  return (
    <Badge color={color} variant={"light"} radius={"md"} size={largeScreen ? "lg" : "md"}>
      {group.name}
    </Badge>
  );
};

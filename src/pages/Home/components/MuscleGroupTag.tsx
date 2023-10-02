import { Badge, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { MuscleGroup } from "../../../types/workout";

const MuscleGroupTag = ({ group }: { group: MuscleGroup }) => {
  const { colorScheme } = useMantineColorScheme();
  const largeScreen = useMediaQuery("(min-width: 900px)");

  const calcDays = () => {
    if (group.dateLastUsed) {
      const now = new Date();
      const dateLastUsed = new Date(group.dateLastUsed);
      return Math.floor((now.getTime() - dateLastUsed.getTime()) / 86400000);
    } else {
      return undefined;
    }
  };

  const daysSince = calcDays() ?? 99;
  const color = daysSince <= 4 ? "teal" : daysSince <= 6 ? "yellow" : daysSince <= 8 ? "pink" : "gray";

  return (
    <Badge
      color={color}
      variant={"light"}
      {...(daysSince > 8 && { bg: colorScheme === "light" ? "gray.1" : "gray.7" })}
      radius={"md"}
      size={largeScreen ? "lg" : "md"}
    >
      {group.name}
    </Badge>
  );
};

export default MuscleGroupTag;

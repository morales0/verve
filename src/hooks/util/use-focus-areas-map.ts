import { useFocusAreas } from "@/context";
import { useMemo } from "react";

export const useFocusAreasMap = () => {
  const focusAreas = useFocusAreas();

  const areasMap = useMemo(
    () => Object.fromEntries(focusAreas.data.map((area) => [area.id, area.name])),
    [focusAreas.data]
  );

  return areasMap;
};

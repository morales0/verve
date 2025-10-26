import { useFocusAreas } from "@/api";
import { useMemo } from "react";

export const useFocusAreasMap = () => {
  const { data: focusAreas } = useFocusAreas({ select: (data) => Object.values(data) });

  const areasMap = useMemo(
    () => Object.fromEntries(focusAreas?.map((area) => [area.id, area.name]) ?? []),
    [focusAreas]
  );

  return areasMap;
};

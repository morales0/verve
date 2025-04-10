import { useUser } from "@/context/user";
import { child } from "firebase/database";
import { useMemo } from "react";
import { useDatabaseList } from "@/hooks/db";
import { useFocusAreas } from "./use-focus-areas.hook";
import { useTags } from "./use-tags.hook";

export type UserExercise = {
  id: string; // unique, created by Firebase
  name: string; // unique
  focusAreas?: string[]; // array of focus area IDs
  tags?: string[]; // array of tag IDs
  type: "sets" | "custom";
};

export type ParsedUserExercise = Omit<UserExercise, "focusAreas" | "tags"> & {
  focusAreas?: { key: string; value: string }[];
  tags?: { key: string; value: string }[];
};

export const useExercises = () => {
  const { dataRef } = useUser();
  const historyRef = child(dataRef, "exercises");

  const tags = useTags();
  const focusAreas = useFocusAreas();
  const { data, loading, error, api } = useDatabaseList<UserExercise>(historyRef);

  // Create the parsed data
  const tagsMap = useMemo(() => Object.fromEntries(tags.data.map((tag) => [tag.id, tag.name])), [tags.data]);
  const areasMap = useMemo(
    () => Object.fromEntries(focusAreas.data.map((area) => [area.id, area.name])),
    [focusAreas.data]
  );
  const parsedData: ParsedUserExercise[] = useMemo(
    () =>
      data.map(({ focusAreas, tags, ...e }) => ({
        ...e,
        focusAreas: focusAreas?.map((a) => ({ key: a, value: areasMap[a] })).filter((a) => a.value !== undefined),
        tags: tags?.map((t) => ({ key: t, value: tagsMap[t] })).filter((t) => t.value !== undefined),
      })),
    [data, tagsMap, areasMap]
  );

  return {
    data,
    parsedData,
    loading,
    error,
    api,
  };
};

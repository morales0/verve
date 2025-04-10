import { useTags } from "@/context";
import { useMemo } from "react";

export const useTagsMap = () => {
  const tags = useTags();

  const tagsMap = useMemo(() => Object.fromEntries(tags.data.map((tag) => [tag.id, tag.name])), [tags.data]);

  return tagsMap;
};

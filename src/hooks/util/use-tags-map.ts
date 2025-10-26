import { useTags } from "@/api";
import { useMemo } from "react";

export const useTagsMap = () => {
  const { data: tags } = useTags({ select: (data) => Object.values(data) });

  const tagsMap = useMemo(() => Object.fromEntries(tags?.map((tag) => [tag.id, tag.name]) ?? []), [tags]);

  return tagsMap;
};

import { useDatabaseList } from "@/hooks/db/";
import { Tag, WithId } from "@/types/app.types";
import { child } from "firebase/database";
import { createContext, PropsWithChildren, useContext } from "react";
import { useUser } from "./user";

export type TagContextType = ReturnType<typeof useDatabaseList<WithId<Tag>>>;
const TagsContext = createContext<TagContextType | null>(null);
export const TagsProvider = ({ children }: PropsWithChildren) => {
  const { dataRef } = useUser();
  const tagsRef = child(dataRef, "tags");
  const data = useDatabaseList<WithId<Tag>>(tagsRef);

  return <TagsContext.Provider value={data}>{children}</TagsContext.Provider>;
};

export const useTags = () => {
  return useContext(TagsContext) as TagContextType;
};

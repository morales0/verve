import { Tag, WithId } from "@/types/app.types";
import { createUserQuery } from "../user-query-factory";

type TagsRecord = Record<string, WithId<Tag>>;

export const useTags = createUserQuery<TagsRecord>("tags");

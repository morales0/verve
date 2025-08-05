import { FocusArea, WithId } from "@/types/app.types";
import { createUserQuery } from "../user-query-factory";

type FocusAreasRecord = Record<string, WithId<FocusArea>>;

export const useFocusAreas = createUserQuery<FocusAreasRecord>("focusAreas");

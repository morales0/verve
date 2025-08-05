import { LogExercise, WithId } from "@/types/app.types";
import { createUserQuery } from "../user-query-factory";

type LogsRecord = Record<string, WithId<LogExercise>>;

export const useLogs = createUserQuery<LogsRecord>("log");

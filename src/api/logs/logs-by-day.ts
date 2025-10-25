import { LogExercise, WithId } from "@/types/app.types";
import { createUserQuery } from "../user-query-factory";
import { DatabaseReference, orderByChild, query, startAfter, equalTo } from "firebase/database";

type LogsRecord = Record<string, WithId<LogExercise>>;

// Query logs for given day
const queryBuilder = (day: Date) => (ref: DatabaseReference) =>
  query(ref, orderByChild("timestamp"), equalTo(day.getTime()));

export const useLogsByDay = (day: Date = new Date()) => createUserQuery<LogsRecord>("log", queryBuilder(day))();

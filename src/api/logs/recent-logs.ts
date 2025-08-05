import { LogExercise, WithId } from "@/types/app.types";
import { createUserQuery } from "../user-query-factory";
import { DatabaseReference, orderByChild, query, startAfter } from "firebase/database";

type LogsRecord = Record<string, WithId<LogExercise>>;

const queryBuilder = (ref: DatabaseReference) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  // Query logs from 7 days ago to now
  return query(ref, orderByChild("timestamp"), startAfter(sevenDaysAgo.getTime(), "timestamp"));
};

export const useRecentLogs = createUserQuery<LogsRecord>("log", queryBuilder);

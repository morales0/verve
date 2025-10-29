import { app } from "@/firebase/config";
import { child, getDatabase, ref, set } from "firebase/database";
import { createUserPath } from "./utils";

export const updateActiveLogDate = (uid: string, date: string) => {
  const db = getDatabase(app);
  const activeLogQuery = child(ref(db, createUserPath(uid)), "activeLog");
  return set(activeLogQuery, { date });
};

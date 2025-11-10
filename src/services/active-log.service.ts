import { app } from "@/firebase/config";
import { child, getDatabase, ref, set, update } from "firebase/database";
import { createUserPath } from "./utils";
import { LoggingSetsUserExercise, UserExercise, WithId } from "@/types/app.types";

export const updateActiveLogDate = (uid: string, date: string) => {
  const db = getDatabase(app);
  const activeLogQuery = child(ref(db, createUserPath(uid)), "activeLog");

  return set(activeLogQuery, { date });
};

export const createNewActiveExercise = (uid: string, exercise: WithId<UserExercise>) => {
  const db = getDatabase(app);
  const activeExercise = child(ref(db, createUserPath(uid)), `activeLog/exercises/${exercise.id}`);

  return set(activeExercise, {
    type: exercise.type,
    userExerciseId: exercise.id,
  });
};

export const updateActiveSetsExercise = (uid: string, exId: string, exerciseData: Partial<LoggingSetsUserExercise>) => {
  const db = getDatabase(app);
  const activeExerciseRef = child(ref(db, createUserPath(uid)), `activeLog/exercises/${exId}`);

  return update(activeExerciseRef, exerciseData);
};

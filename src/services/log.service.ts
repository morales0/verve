import { LogExercise, WithId } from "@/types/app.types";
import {
  child,
  DatabaseReference,
  equalTo,
  onValue,
  orderByChild,
  push,
  query,
  remove,
  set,
  startAfter,
  update,
} from "firebase/database";

export const getThisWeekLog = (
  userRef: DatabaseReference,
  setLog: (data: LogExercise[]) => void,
  setLoading: (value: boolean) => void
) => {
  // Get sunday of this week
  const now = new Date();
  const day = now.getDay();

  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day);
  sunday.setHours(0, 0, 0, 0);

  // Query to log exercises from sunday to now
  const logQuery = query(child(userRef, "log"), orderByChild("timestamp"), startAfter(sunday.getTime(), "timestamp"));
  const off = onValue(logQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as { [id: string]: LogExercise };
      const values = Object.values(data).filter(({ status }) => status !== "logging");

      setLog(values);
    } else {
      setLog([]);
    }
    setLoading(false);
  });

  return off;
};

export const getLast7DaysLogs = (
  userRef: DatabaseReference,
  setLog: (data: WithId<LogExercise>[]) => void,
  setLoading: (value: boolean) => void
) => {
  // Get timestamp for 7 days ago
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  // Query logs from 7 days ago to now
  const logQuery = query(
    child(userRef, "log"),
    orderByChild("timestamp"),
    startAfter(sevenDaysAgo.getTime(), "timestamp")
  );

  const off = onValue(logQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as { [id: string]: WithId<LogExercise> };

      const values = Object.values(data);
      setLog(values);
    } else {
      setLog([]);
    }
    setLoading(false);
  });

  return off;
};

export const getTodayLog = (
  userRef: DatabaseReference,
  setLog: (data: WithId<LogExercise>[]) => void,
  setLoading: (value: boolean) => void
) => {
  // Get sunday of this week
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Query to log exercises from sunday to now
  const logQuery = query(child(userRef, "log"), orderByChild("timestamp"), startAfter(now.getTime(), "timestamp"));
  const off = onValue(logQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as { [id: string]: WithId<LogExercise> };
      const values = Object.values(data);

      setLog(values);
    } else {
      setLog([]);
    }
    setLoading(false);
  });

  return off;
};

export const getLoggingExercises = (
  userRef: DatabaseReference,
  setLog: (data: WithId<LogExercise>[]) => void,
  setLoading: (value: boolean) => void
) => {
  // Query for ongoing log exercises
  const logQuery = query(child(userRef, "log"), orderByChild("complete"), equalTo(false));
  const off = onValue(logQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as { [id: string]: WithId<LogExercise> };
      const values = Object.values(data);

      setLog(values);
    } else {
      setLog([]);
    }
    setLoading(false);
  });

  return off;
};

export const getLogExercise = (
  userRef: DatabaseReference,
  id: string,
  setLog: (data: LogExercise | undefined) => void,
  setLoading: (value: boolean) => void
) => {
  const logQuery = child(userRef, `log/${id}`);
  const off = onValue(logQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as LogExercise;

      console.log("setting log change", data);

      setLog(data);
    } else {
      setLog(undefined);
    }
    setLoading(false);
  });

  return off;
};

export const addExerciseToLog = async (userRef: DatabaseReference, exercise: LogExercise) => {
  const childRef = push(child(userRef, "log"));
  return set(childRef, {
    ...exercise,
    // complete: false,
    id: childRef.key,
  }).then(() => childRef.key);
};

export const completeExerciseInLog = async (userRef: DatabaseReference, id: string) => {
  const childRef = child(userRef, `log/${id}`);
  const timestamp = new Date().getTime();

  return update(childRef, {
    complete: true,
    timestamp,
  });
};
export const updateLogExercise = async (userRef: DatabaseReference, id: string, updates: Partial<LogExercise>) => {
  const childRef = child(userRef, `log/${id}`);

  console.log("updating log", id, updates);

  return update(childRef, updates);
};

export const removeExerciseFromLog = async (userRef: DatabaseReference, id: string) =>
  remove(child(userRef, `log/${id}`));

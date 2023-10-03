import { limitToLast, off, onValue, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import { WorkoutHistory } from "../types/workout";
import useDatabaseList from "./databaseList.hook";

enum HistoryType {
  Days = "days",
  Workouts = "workouts",
}

const useWorkoutHistory = () => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [limit, setLimit] = useState(14);
  const [historyType, setHistoryType] = useState<HistoryType>(HistoryType.Workouts);

  const historyRef = ref(db, `users/${user?.uid}/history`);
  const historyQuery = query(historyRef, limitToLast(limit));
  const { status, data } = useDatabaseList<WorkoutHistory>(historyQuery);

  return {
    status,
    data: data,
    setLimit,
    setHistoryType,
  };
};

export default useWorkoutHistory;

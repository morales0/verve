import { limitToLast, query, ref } from "firebase/database";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import useDatabaseList from "./databaseList.hook";
import { ExerciseHistory } from "../types/workout";

const useExerciseHistory = (exId: string | undefined, limit = 1) => {
  const { user } = useAuth();
  const { db } = useDatabase();

  const historyRef = ref(db, `users/${user?.uid}/exerciseHistory/${exId}`);
  const historyQuery = query(historyRef, limitToLast(limit));
  const { status, data } = useDatabaseList<ExerciseHistory>(historyQuery);

  console.log("HOOK", data);

  return {
    status,
    data,
  };
};

export default useExerciseHistory;

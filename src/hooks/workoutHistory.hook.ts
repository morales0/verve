import {
  limitToLast,
  off,
  onValue,
  orderByKey,
  orderByValue,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";

enum HistoryType {
  Days = "days",
  Workouts = "workouts",
}

export type WorkoutHistoryType = {
  [day: string]: {
    [time: string]: {
      completedExercises: { [name: string]: object };
      dateEnded: string;
      dateStarted: string;
      timeEnded: string;
      timeStarted: string;
    };
  };
};

const useWorkoutHistory = () => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [workouts, setWorkouts] = useState<WorkoutHistoryType>({});
  const [limit, setLimit] = useState(5);
  const [historyType, setHistoryType] = useState<HistoryType>(
    HistoryType.Workouts
  );

  useEffect(() => {
    if (!user) return;

    const historyQuery = query(
      ref(db, `users/${user.uid}/workoutHistory`),
      limitToLast(limit),
      orderByKey()
    );

    onValue(historyQuery, (snapshot) => {
      const data = snapshot.val() as WorkoutHistoryType;
      setWorkouts(data);
    });

    return () => off(historyQuery);
  }, [user, db, limit]);

  return {
    workouts,
    setLimit,
    setHistoryType,
  };
};

export default useWorkoutHistory;

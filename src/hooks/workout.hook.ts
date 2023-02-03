import { off, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import { STATUS } from "../types/util";
import { WorkoutExercise } from "../types/workout";

type Workout = {
  exercises?: {
    [id: string]: WorkoutExercise;
  };
  dateStarted?: string;
  timeStarted?: string;
};

const useWorkout = () => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [status, setStatus] = useState<STATUS>(STATUS.LOADING);
  const [workout, setWorkout] = useState<Workout>({});
  const refString = `users/${user?.uid}/currentWorkout`;

  useEffect(() => {
    if (!user) return;

    const workoutRef = ref(db, refString);
    onValue(workoutRef, (snapshot) => {
      if (snapshot.exists()) {
        setWorkout(snapshot.val());
      } else {
        console.log("workout doesn't exist");
      }

      setStatus(STATUS.SUCCESS);
    });

    return () => off(workoutRef);
  }, [db, user]);

  const addExercise = async (exercise: WorkoutExercise) => {
    const newRef = push(ref(db, refString + "/exercises"), exercise);
    return set(newRef, exercise);
  };

  const removeExercise = async (exerciseId: string) => {
    return remove(ref(db, refString + "/exercises" + exerciseId));
  };

  return {
    status,
    workout,
    api: {
      addExercise,
      removeExercise,
    },
  };
};

export default useWorkout;

import { child, off, onValue, push, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import { useUser } from "../context/user";
import { STATUS } from "../types/util";
import { Workout, WorkoutExercise } from "../types/workout";

const useWorkout = () => {
  const { dataRef } = useUser();
  const { user } = useAuth();
  const { db } = useDatabase();
  const [status, setStatus] = useState<STATUS>(STATUS.LOADING);
  const [workout, setWorkout] = useState<Workout>({});
  const refString = `users/${user?.uid}/currentWorkout`;

  useEffect(() => {
    if (!user) return;

    const workoutRef = ref(db, refString);
    const off = onValue(workoutRef, (snapshot) => {
      if (snapshot.exists()) {
        // exercises comes in as an object, lets make it an array, and cast it
        const data = snapshot.val();
        if (data.exercises) {
          const listExercises: WorkoutExercise[] = Object.values(data.exercises);
          data.exercises = listExercises;
        }

        setWorkout(data as Workout);
      }

      setStatus(STATUS.SUCCESS);
    });

    return () => {
      off();
    };
  }, [db, user]);

  const addExercise = async (exercise: WorkoutExercise) => {
    const newRef = push(ref(db, refString + "/exercises"));
    return set(newRef, {
      ...exercise,
      workoutId: newRef.key,
    }).then(() => newRef.key);
  };

  const removeExercise = async (id: string) => {
    return remove(ref(db, refString + `/exercises/${id}`));
  };

  const cancelWorkout = () => {
    setStatus(STATUS.DELETING);

    return remove(ref(db, refString));
  };

  const completeWorkout = async () => {
    setStatus(STATUS.COMPLETING);

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    // we want to move this workout to workoutHistory
    const historyRef = ref(db, `users/${user?.uid}/history`);
    const newRef = push(historyRef);
    return set(newRef, {
      ...workout,
      dateEnded: now.toString(),
      timeEnded: time,
    })
      .then(() => {
        const muscleGroupsRef = ref(db, `users/${user?.uid}/muscleGroups`);
        const exHistoryRef = child(dataRef, "exerciseHistory");
        workout.exercises?.forEach((ex) => {
          // update groups
          ex.primaryMuscleGroups?.forEach((group) => {
            set(child(muscleGroupsRef, group), {
              dateLastUsed: now.toDateString(),
              name: group,
            });
          });
          ex.secondaryMuscleGroups?.forEach((group) => {
            set(child(muscleGroupsRef, group), {
              dateLastUsed: now.toDateString(),
              name: group,
            });
          });

          // add to history
          if (ex.id) {
            const newEntryRef = push(child(exHistoryRef, ex.id));
            set(newEntryRef, {
              histId: newEntryRef.key,
              exId: ex.id,
              sets: ex.sets,
              date: now.toString(),
              time: time,
            });
          }
        });
      })
      .then(() => {
        // finally, delete workout
        remove(ref(db, refString));
      });
  };

  return {
    status,
    data: workout,
    api: {
      addExercise,
      removeExercise,
      cancelWorkout,
      completeWorkout,
    },
  };
};

export default useWorkout;

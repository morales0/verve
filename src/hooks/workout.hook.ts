import { child, onValue, push, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { useDatabase } from "@/context/database";
import { useUser } from "@/context/user";
import { STATUS } from "@/types/util";
import { Workout, WorkoutExercise } from "@/types/workout";

const useWorkout = () => {
  const { dataRef } = useUser();
  const { user } = useAuth();
  const { db } = useDatabase();
  const [status, setStatus] = useState<STATUS>(STATUS.LOADING);
  const [workout, setWorkout] = useState<Workout>({});

  /* Refs */
  const workoutRef = child(dataRef, "workout");
  const exercisesRef = child(workoutRef, "exercises");
  const historyRef = child(dataRef, "history");
  const muscleGroupsRef = child(dataRef, "muscleGroups");
  const exerciseHistoryRef = child(dataRef, "exerciseHistory");

  // Load workout data
  useEffect(() => {
    if (!user) return;

    const off = onValue(workoutRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        console.log(data);
        setWorkout(data as Workout);
      }

      setStatus(STATUS.SUCCESS);
    });

    return () => {
      off();
    };
  }, [db, user]);

  const addExercises = async (exercises: WorkoutExercise[], circuit: number) => {
    const circuits = [...(workout.exercises ?? [[]])];
    const numCircuits = circuits.length;

    // Always add to first group
    if (circuit === 0) {
      circuits[0].push(...exercises);
      console.log(circuits);
      return set(exercisesRef, circuits);
    }

    // Skip if circuit is not in range, not immediate, or last circuit is empty
    if (circuit > numCircuits || (circuits.at(-1)?.length === 0 && circuit > 1)) return;

    // Add new array if circuit is next up
    if (circuit === numCircuits) {
      circuits.push([...exercises]);
      return set(exercisesRef, circuits);
    }

    circuits[circuit].push(...exercises);
    return set(exercisesRef, circuits);
  };

  const updateExercise = async (exerciseUpdates: Partial<WorkoutExercise>, circuit: number, index: number) => {
    const exRef = child(exercisesRef, `${circuit}/${index}`);
    update(exRef, exerciseUpdates);
  };

  const removeExercises = async (circuit: number, ids: string[]) => {
    const circuits = [...(workout.exercises ?? [[]])];
    if (circuit >= circuits.length) return;

    circuits[circuit] = circuits[circuit].filter((ex) => !ids.includes(ex.id));

    return set(exercisesRef, circuits);
  };

  const removeCircuit = async (circuit: number) => {
    return set(exercisesRef, workout.exercises?.filter((_, i) => i !== circuit));
  };

  const cancelWorkout = () => {
    setStatus(STATUS.DELETING);

    return remove(workoutRef);
  };

  const completeWorkout = async () => {
    setStatus(STATUS.COMPLETING);

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    const newRef = push(historyRef);
    return set(newRef, {
      ...workout,
      dateEnded: now.toString(),
      timeEnded: time,
    })
      .then(() => {
        workout.exercises?.flat().forEach((ex) => {
          // update groups
          ex.primaryMuscleGroups?.forEach((group) => {
            set(child(muscleGroupsRef, `${group}/dataLastUsed`), now.toDateString());
          });
          ex.secondaryMuscleGroups?.forEach((group) => {
            set(child(muscleGroupsRef, `${group}/dataLastUsed`), now.toDateString());
          });

          // add to history
          if (ex.id) {
            const newEntryRef = push(child(exerciseHistoryRef, ex.id));
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
        remove(workoutRef);
      });
  };

  return {
    status,
    data: workout,
    api: {
      addExercises,
      updateExercise,
      removeExercises,
      removeCircuit,
      cancelWorkout,
      completeWorkout,
    },
  };
};

export default useWorkout;

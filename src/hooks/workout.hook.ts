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

  const addExercises = async (exercises: WorkoutExercise[], group: number) => {
    console.log(group);
    if (group === 0) {
      const normalExercises = [...(workout.exercises?.normal ?? [])];
      normalExercises.push(...exercises);
      return set(child(exercisesRef, "normal"), normalExercises);
    }

    const index = group - 1;
    const numCircuits = workout.exercises?.circuits?.length ?? 0;
    const circuits = [...(workout.exercises?.circuits ?? [])];

    if (index > numCircuits) return;

    // Add new array if circuit is next up
    if (index === numCircuits) {
      circuits.push([]);
    }

    circuits[index].push(...exercises);
    return set(child(exercisesRef, "circuits"), circuits);
  };

  const updateExercise = async (exerciseUpdates: Partial<WorkoutExercise>, group: number, index: number) => {
    const exRef = child(exercisesRef, `${group === 0 ? "normal" : "circuits"}/${index}`);
    update(exRef, exerciseUpdates);
  };

  const removeExercises = async (ids: string[], group: number) => {
    if (group === 0) {
      const normalExercises = [...(workout.exercises?.normal ?? [])];
      return set(
        child(exercisesRef, "normal"),
        normalExercises.filter((ex) => !ids.includes(ex.id))
      );
    }

    const circuit = group - 1;
    const circuits = [...(workout.exercises?.circuits ?? [[]])];
    const circuitExercises = circuits.at(circuit);

    if (!circuitExercises) return;

    return set(
      child(exercisesRef, `circuits/${circuit}`),
      circuitExercises.filter((ex) => !ids.includes(ex.id))
    );
  };

  const removeCircuit = async (group: number) => {
    const circuit = group - 1;
    const circuits = [...(workout.exercises?.circuits ?? [])];

    return set(
      child(exercisesRef, `circuits`),
      circuits.filter((_, i) => i !== circuit)
    );
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
        const normalExercises = workout.exercises?.normal ?? [];
        const circuitExercises = workout.exercises?.circuits?.flat() ?? [];
        return [...normalExercises, ...circuitExercises].forEach((ex) => {
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
        return remove(workoutRef);
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

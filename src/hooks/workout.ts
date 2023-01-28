import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";

interface IExercise {
  name: string;
  complete: boolean;
  sets: Array<any>;
}

interface IWorkout {
  exercises: Array<IExercise>;
}

const useWorkout = () => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [workout, setWorkout] = useState<IWorkout>({ exercises: [] });

  useEffect(() => {
    if (!user) return;

    const workoutRef = ref(db, `users/${user.uid}/currentWorkout`);
    onValue(workoutRef, (snapshot) => {
      if (snapshot.exists()) {
        setWorkout(snapshot.val());
      } else {
        console.log("workout doesn't exist");
      }
    });

    return () => off(workoutRef);
  }, [db, user]);

  /*
  const addExercise = (exercise: IExercise) => {
    workoutRef.push(exercise);
  };

  const removeExercise = (exerciseId: string) => {
    workoutRef.child(exerciseId).remove();
  };

  const completeExercise = (exerciseId: string) => {
    workoutRef.child(exerciseId).update({ complete: true });
  };

  const addSet = (exerciseId: string, set: any) => {
    workoutRef.child(exerciseId).child("sets").push(set);
  };

  const removeSet = (exerciseId: string, setId: string) => {
    workoutRef.child(exerciseId).child("sets").child(setId).remove();
  };

  const updateSet = (exerciseId: string, setId: string, set: any) => {
    workoutRef.child(exerciseId).child("sets").child(setId).update(set);
  };
  */

  return {
    workout,
    /*
    addExercise,
    removeExercise,
    completeExercise,
    addSet,
    removeSet,
    updateSet,
    */
  };
};

export default useWorkout;

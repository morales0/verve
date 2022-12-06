import { useState, useEffect } from "react";
import { useDatabase, useUser } from "reactfire";
import {
  get,
  limitToLast,
  off,
  query,
  ref,
  set,
  update,
} from "firebase/database";
import { toDateKey } from "util/date";

/**
 * Returns an object of functions to be used for a user's current workout
 */
const useWorkoutAPI = () => {
  const db = useDatabase();
  const user = useUser();

  const workoutRef = ref(db, `users/${user.data.uid}/workout`);

  const api = {
    startExercise: (e) => {
      const updates = {};
      let starterSets = [];

      // Check if the history for this exercise exists
      const newExHistoryRef = ref(
        db,
        `users/${user.data.uid}/exerciseHistory/${e.id}/`
      );
      get(query(newExHistoryRef, limitToLast(1))).then((snapshot) => {
        if (snapshot.exists()) {
          let data = Object.values(snapshot.val());
          starterSets = data[0];
        } else {
          // Create blank starting sets
          starterSets.push(
            e.measures.reduce((acc, val) => {
              acc[val] = "";
              return acc;
            }, {})
          );
        }

        // Create current exercise
        updates[`/currentExercise/`] = {
          id: e.id,
          name: e.name,
          measures: e.measures,
          starterSets: starterSets,
        };

        update(workoutRef, updates);
      });
    },

    cancelExercise: () => {
      const updates = {};
      updates[`/currentExercise/`] = null;

      update(workoutRef, updates);
    },

    finishExercise: (e) => {
      const updates = {};
      updates[`/completedExercises/${e.id}/`] = e.sets;
      updates["/currentExercise/"] = null;

      update(workoutRef, updates);
    },

    completeWorkout: (workout) => {
      off(workoutRef);

      const dateStarted = new Date(workout.data.dateStarted);
      const dateEnded = new Date();
      const timeEnded = dateEnded.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      // Create unique date key (by day)
      let dateKey = toDateKey(dateStarted);

      // Unique timekey within day
      let timeKey = dateStarted.toLocaleTimeString();

      // Save workout history
      set(
        ref(db, `users/${user.data.uid}/workoutHistory/${dateKey}/${timeKey}`),
        {
          ...workout.data,
          dateEnded: dateEnded.toString(),
          timeEnded: timeEnded,
          dateKey: dateKey,
          timeKey: timeKey,
          inProgress: false,
        }
      );

      // Save each exercise history
      Object.entries(workout.data["completedExercises"]).forEach(
        ([id, sets]) => {
          set(
            ref(
              db,
              `users/${user.data.uid}/exerciseHistory/${id}/${dateKey}-${timeKey}`
            ),
            sets
          );
        }
      );

      // Reset workout
    },

    cancelWorkout: (e) => {
      off(workoutRef);
    },
  };

  return api;
};

export default useWorkoutAPI;

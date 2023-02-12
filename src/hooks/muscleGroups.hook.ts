import { child, get, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import { STATUS } from "../types/util";
import { MuscleGroup } from "../types/workout";
import useDatabaseList from "./databaseList.hook";

const useMuscleGroups = () => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [limit, setLimit] = useState(5);

  const muscleGroupsRef = ref(db, `users/${user?.uid}/muscleGroups`);
  const { status, data, api } = useDatabaseList<MuscleGroup>(muscleGroupsRef);

  useEffect(() => {
    // Populate with default muscle groups if its the first time
    if (status === STATUS.LOADING) return;

    if (data.length === 0) {
      const hasUpdatedMuscleGroupsRef = ref(db, `users/${user?.uid}/meta/hasUpdatedMuscleGroups`);
      get(hasUpdatedMuscleGroupsRef).then((snapshot) => {
        if (!snapshot.exists()) {
          // Auto populate
          const defaultGroups = ["Shoulders", "Triceps", "Biceps", "Back", "Chest", "Core", "Legs", "Glutes"];
          defaultGroups.forEach((group) => {
            set(child(muscleGroupsRef, group), {
              name: group,
            });
          });

          set(hasUpdatedMuscleGroupsRef, true);
        }
      });
    }
  });

  return {
    status,
    data: data,
  };
};

export default useMuscleGroups;

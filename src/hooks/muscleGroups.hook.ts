import { child, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useUser } from "../context/user";
import { STATUS } from "../types/util";
import { MuscleGroup } from "../types/workout";
import useDatabaseList from "./databaseList.hook";

const useMuscleGroups = () => {
  const { dataRef, meta } = useUser();
  const [limit, setLimit] = useState(5);

  const muscleGroupsRef = child(dataRef, "muscleGroups");
  const { status, data, api } = useDatabaseList<MuscleGroup>(muscleGroupsRef);

  const addMuscleGroup = (name: string) => {
    const formattedName = name.slice(0, 1).toUpperCase() + name.slice(1);
    api.addChild({ name: formattedName }, formattedName);
  };

  useEffect(() => {
    // Populate with default muscle groups if its the first time
    if (status === STATUS.LOADING) return;
    if (data.length === 0) {
      if (!meta.hasUpdatedMuscleGroups) {
        // Auto populate
        const defaultGroups = ["Shoulders", "Triceps", "Biceps", "Back", "Chest", "Core", "Legs"];
        defaultGroups.forEach((group) => {
          set(child(muscleGroupsRef, group), {
            name: group,
          });
        });

        set(child(dataRef, "meta/hasUpdatedMuscleGroups"), true);
      }
    }
  });

  return {
    status,
    data: data,
    api: {
      addMuscleGroup,
    },
  };
};

export default useMuscleGroups;

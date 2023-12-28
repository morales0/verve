import { child, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useUser } from "../context/user";
import { STATUS } from "../types/util";
import { MuscleGroup } from "../types/workout";
import useDatabaseList from "./databaseList.hook";

const useMuscleGroups = () => {
  const { dataRef, meta } = useUser();

  const muscleGroupsRef = child(dataRef, "muscleGroups");
  const { status, data, api } = useDatabaseList<MuscleGroup>(muscleGroupsRef);

  const addMuscleGroup = (name: string) => {
    const formattedName = name.slice(0, 1).toUpperCase() + name.slice(1);
    api.addChild({ name: formattedName });
  };
  const removeMuscleGroup = (id: string) => {
    api.removeChild(id);
  };
  const updateMuscleGroup = (id: string, updates: Partial<MuscleGroup>) => {
    const toUpdate = data.find((group) => group.id === id || group.name === id);

    if (toUpdate === undefined) return;

    if (toUpdate?.id === undefined) {
      // Update the id to be the current name
      return api.updateChild(id, { ...updates, id: toUpdate.name });
    }

    return api.updateChild(id, updates);
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
      removeMuscleGroup,
      updateMuscleGroup,
    },
  };
};

export default useMuscleGroups;

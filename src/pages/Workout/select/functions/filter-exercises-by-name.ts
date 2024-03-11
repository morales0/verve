import { UserExercise } from "@/types/workout";

export const filterExercisesByName = (data: UserExercise[], query: string) =>
  data.filter((ex) => query === "" || ex.name.toLowerCase().includes(query.toLowerCase()));

const sortByName = (order: string) => {
  return (a: UserExercise, b: UserExercise) => {
    return a.name.localeCompare(b.name) * (order === "asc" ? -1 : 1);
  };
};

const sortByUsed = (order: string) => {
  return (a: UserExercise, b: UserExercise) => {
    if (!a.lastUsed) return 1;
    if (!b.lastUsed) return -1;
    const aLastUsed = new Date(a.lastUsed).valueOf();
    const bLastUsed = new Date(b.lastUsed).valueOf();

    if (aLastUsed < bLastUsed) return order === "asc" ? -1 : 1;
    if (aLastUsed > bLastUsed) return order === "asc" ? 1 : -1;
    return 0;
  };
};

const sortByCreated = (order: string) => {
  return (a: UserExercise, b: UserExercise) => {
    return order === "asc" ? -1 : 1;
  };
};

const getSortFunctionByValue = (value: string, order: string) => {
  switch (value) {
    case "name":
      return sortByName(order);
    case "lastUsed":
      return sortByUsed(order);
    case "created":
      return sortByCreated(order);
    default:
      return sortByName(order);
  }
};

export const sortExercises = (data: UserExercise[], sort: { order: string; value: string }) =>
  data.sort(getSortFunctionByValue(sort.value, sort.order));

const filterExercisesByMuscleGroups = (data: UserExercise[], muscleGroups: string[]) => {
  return data.filter((ex) => {
    if (muscleGroups.length === 0) {
      return true;
    }
    return muscleGroups.some(
      (group) => ex.primaryMuscleGroups?.includes(group) || ex.secondaryMuscleGroups?.includes(group)
    );
  });
};

const filterExercisesByTypes = (data: UserExercise[], types: string[]) => {
  return data.filter((ex) => {
    if (types.length === 0) {
      return true;
    }
    return types.includes(ex.type);
  });
};

export const filterExercisesByFilters = (data: UserExercise[], filters: Record<string, string[]>) => {
  let filteredData = data;
  if (filters.muscleGroups) {
    filteredData = filterExercisesByMuscleGroups(filteredData, filters.muscleGroups);
  }
  if (filters.type) {
    filteredData = filterExercisesByTypes(filteredData, filters.type);
  }
  return filteredData;
};

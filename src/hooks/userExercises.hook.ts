import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import { UserExercise } from "../types/workout";
import useDatabaseList from "./databaseList.hook";

const useUserExercises = () => {
  const { user } = useAuth();
  const { db } = useDatabase();

  const userExercisesRef = ref(db, `users/${user?.uid}/userExercises`);
  const { status, data, api } = useDatabaseList<UserExercise>(userExercisesRef);

  return {
    status,
    data,
    api,
  };
};

export default useUserExercises;

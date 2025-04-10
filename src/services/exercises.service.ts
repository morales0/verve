import { UserExercise, WithId } from "@/types/app.types";
import { child, DatabaseReference, onValue, push, remove, set, update } from "firebase/database";

export const getUserExercises = (
  userRef: DatabaseReference,
  setData: (data: WithId<UserExercise>[]) => void,
  setLoading: (value: boolean) => void
) => {
  const exercisesRef = child(userRef, "exercises");
  const off = onValue(exercisesRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as { [id: string]: WithId<UserExercise> };
      const values = Object.values(data);

      setData(values);
    } else {
      setData([]);
    }
    setLoading(false);
  });

  return off;
};

export const removeUserExercise = async (userRef: DatabaseReference, id: string) =>
  remove(child(userRef, `exercises/${id}`));
export const addUserExercise = async (userRef: DatabaseReference, exercise: Omit<UserExercise, "id">) => {
  const childRef = push(child(userRef, "exercises"));
  return set(childRef, {
    ...exercise,
    id: childRef.key,
  }).then(() => childRef.key);
};
export const updateUserExercise = async (
  userRef: DatabaseReference,
  id: string,
  updates: Partial<Omit<UserExercise, "id">>
) => update(child(userRef, `exercises/${id}`), updates);

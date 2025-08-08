import { FocusArea } from "@/types/app.types";
import { child, DatabaseReference, push, set, update } from "firebase/database";

export const updateFocusArea = (userDataRef: DatabaseReference, id: string, updates: Partial<FocusArea>) => {
  return update(child(userDataRef, `focusAreas/${id}`), updates);
};

export const addFocusArea = (userDataRef: DatabaseReference, name: string) => {
  const key = push(child(userDataRef, "focusAreas"));
  return set(key, {
    name,
    id: key.key,
  });
};

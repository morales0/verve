import { useUser } from "@/context";
import { DatabaseReference, onValue, set, update, remove, Query, child } from "firebase/database";
import { useEffect, useState } from "react";

export const useDatabaseValue = <T>(path: string, key?: any) => {
  const { dataRef } = useUser();
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = child(dataRef, path);

  useEffect(() => {
    const off = onValue(
      ref,
      (snapshot) => {
        setLoading(true);
        if (snapshot.exists()) {
          setData(snapshot.val() as T);
        } else {
          setData(undefined);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      off();
    };
  }, [ref.ref.key, key]);

  const setValue = async (value: T) => set(ref.ref, value);
  const updateValue = async (updates: Partial<T>) => update(ref.ref, updates);
  const removeValue = async () => remove(ref.ref);

  return {
    data,
    loading,
    error,
    api: {
      setValue,
      updateValue,
      removeValue,
    },
  };
};

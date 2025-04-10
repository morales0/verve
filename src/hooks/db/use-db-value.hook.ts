import { DatabaseReference, onValue, set, update, remove, Query } from "firebase/database";
import { useEffect, useState } from "react";

export const useDatabaseValue = <T>(ref: DatabaseReference | Query, key?: any) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const off = onValue(
      ref,
      (snapshot) => {
        setLoading(true);
        if (snapshot.exists()) {
          setData(snapshot.val() as T);
        } else {
          setData(null);
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

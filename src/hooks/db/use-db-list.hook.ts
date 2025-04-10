import { child, DatabaseReference, onValue, push, Query, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";

export const useDatabaseList = <T>(ref: DatabaseReference | Query, key?: any) => {
  const [data, setData] = useState<T[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const off = onValue(ref, (snapshot) => {
      console.log("onValue: ", ref.ref.key);
      if (snapshot.exists()) {
        const dataObj = snapshot.val() as { [id: string]: T };

        setKeys(Object.keys(dataObj));
        setData(Object.values(dataObj));
      } else {
        setData([]);
        setKeys([]);
      }

      setLoading(false);
    });

    return () => {
      off();
    };
  }, []);

  const addChild = async (newChild: Omit<T, "id">, id?: string) => {
    if (id) {
      const childRef = child(ref.ref, key);

      if (keys.includes(id)) throw new Error("id already exists");
      return set(childRef, newChild).then(() => id);
    } else {
      const childRef = push(ref.ref);
      return set(childRef, {
        ...newChild,
        id: childRef.key,
      }).then(() => childRef.key);
    }
  };

  const removeChild = async (key: string) => remove(child(ref.ref, key));
  const updateChild = async (key: string, updates: Partial<T>) => update(child(ref.ref, key), updates).then(() => key);

  return {
    data,
    loading,
    error,
    api: {
      addChild,
      removeChild,
      updateChild,
    },
  };
};

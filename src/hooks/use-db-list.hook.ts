import { child, DatabaseReference, onValue, push, Query, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";

const useDatabaseList = <T>(listRef: DatabaseReference | Query, key?: any) => {
  const [data, setData] = useState<T[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const off = onValue(listRef, (snapshot) => {
      setLoading(true);
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
  }, [listRef.ref.key, key]);

  const addChild = async (newChild: Omit<T, "id">, id?: string) => {
    if (id) {
      const childRef = child(listRef.ref, key);

      if (keys.includes(id)) throw new Error("id already exists");
      return set(childRef, newChild).then(() => id);
    } else {
      const childRef = push(listRef.ref);
      return set(childRef, {
        ...newChild,
        id: childRef.key,
      }).then(() => childRef.key);
    }
  };

  const removeChild = async (key: string) => remove(child(listRef.ref, key));
  const updateChild = async (key: string, updates: Partial<T>) =>
    update(child(listRef.ref, key), updates).then(() => key);

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

export default useDatabaseList;

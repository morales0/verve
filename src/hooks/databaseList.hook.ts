import {
  Database,
  DatabaseReference,
  off,
  onValue,
  push,
  Query,
  query,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import { STATUS } from "../types/util";

const useDatabaseList = <T>(listRef: DatabaseReference | Query) => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [data, setData] = useState<T[]>([]);
  const [idList, setIdList] = useState<string[]>([]);
  const [status, setStatus] = useState<STATUS>(STATUS.LOADING);

  useEffect(() => {
    if (!user) return;

    onValue(listRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val() as { [id: string]: T };
        setIdList(Object.keys(dataObj));
        setData(Object.values(dataObj));
      }

      setStatus(STATUS.SUCCESS);
    });

    return () => off(listRef);
  }, [db, user]);

  const addChild = async (child: T, key?: string) => {
    if (key) {
      const childRef = ref(db, `users/${user?.uid}/${listRef.ref.key}/${key}`);

      if (idList.includes(key)) throw new Error("Key already exists");
      return set(childRef, child);
    } else {
      const childRef = push(ref(db, `users/${user?.uid}/${listRef.ref.key}`));
      return set(childRef, {
        ...child,
        id: childRef.key,
      });
    }
  };

  const removeChild = async (key: string) => {
    const childRef = ref(db, `users/${user?.uid}/${listRef.ref.key}/${key}`);
    return remove(childRef);
  };

  const updateChild = async (key: string, updates: Partial<T>) => {
    const childRef = ref(db, `users/${user?.uid}/${listRef.ref.key}/${key}`);
    return update(childRef, updates);
  };

  return {
    status,
    data,
    api: {
      addChild,
      removeChild,
      updateChild,
    },
  };
};

export default useDatabaseList;

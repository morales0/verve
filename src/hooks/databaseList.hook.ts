import { off, onValue, push, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";
import { STATUS } from "../types/util";

const useDatabaseList = <T>(dbRefString: string) => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [data, setData] = useState<T[]>([]);
  const [idList, setIdList] = useState<string[]>([]);
  const [status, setStatus] = useState<STATUS>(STATUS.LOADING);
  const dbRefTemplate = `users/${user?.uid}/${dbRefString}`;

  useEffect(() => {
    if (!user) return;

    const dbRef = ref(db, dbRefTemplate);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val() as { [id: string]: T };
        setIdList(Object.keys(dataObj));
        setData(Object.values(dataObj));
      }

      setStatus(STATUS.SUCCESS);
    });

    return () => off(dbRef);
  }, [db, user]);

  const addChild = async (child: T, key?: string) => {
    if (key) {
      if (idList.includes(key)) throw new Error("Key already exists");
      return set(ref(db, `${dbRefTemplate}/${key}`), child);
    } else {
      const newRef = push(ref(db, dbRefTemplate));
      return set(newRef, child);
    }
  };

  const removeChild = async (key: string) => {
    return remove(ref(db, `${dbRefTemplate}/${key}`));
  };

  const updateChild = async (key: string, updates: Partial<T>) => {
    return update(ref(db, `${dbRefTemplate}/${key}`), updates);
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

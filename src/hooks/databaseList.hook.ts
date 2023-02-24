import { child, DatabaseReference, off, onValue, push, Query, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { STATUS } from "../types/util";

const useDatabaseList = <T>(listRef: DatabaseReference | Query) => {
  const [data, setData] = useState<T[]>([]);
  const [idList, setIdList] = useState<string[]>([]);
  const [status, setStatus] = useState<STATUS>(STATUS.LOADING);

  useEffect(() => {
    onValue(listRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val() as { [id: string]: T };
        setIdList(Object.keys(dataObj));
        setData(Object.values(dataObj));
      } else {
        setData([]);
        setIdList([]);
      }

      setStatus(STATUS.SUCCESS);
    });

    return () => off(listRef);
  }, []);

  const addChild = async (newChild: T, key?: string) => {
    if (key) {
      const childRef = child(listRef.ref, key);

      if (idList.includes(key)) throw new Error("Key already exists");
      return set(childRef, child);
    } else {
      const childRef = push(listRef.ref);
      return set(childRef, {
        ...newChild,
        id: childRef.key,
      });
    }
  };

  const removeChild = async (key: string) => {
    return remove(child(listRef.ref, key));
  };

  const updateChild = async (key: string, updates: Partial<T>) => {
    return update(child(listRef.ref, key), updates);
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

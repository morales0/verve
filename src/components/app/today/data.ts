import { useUser } from "@/context";
import { getActiveLog, getLogsByDate } from "@/services/log.service";
import { LogExercise, WithId } from "@/types/app.types";
import { useEffect, useState } from "react";

export const useLogExercisesByDay = (timestamp: number | undefined) => {
  const { dataRef } = useUser()

  // Subscribe to the curent date's log
  const [logs, setLogs] = useState<WithId<LogExercise>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dataRef) return;
    setLoading(true);
    const off = getLogsByDate(dataRef, setLogs, setLoading, timestamp);

    return () => {
      off();
    };
  }, [dataRef, timestamp]);

  return { logs, loading }
}

export const useActiveLogExercises = () => {
  const { dataRef } = useUser()

  const [logs, setLogs] = useState<WithId<LogExercise>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dataRef) return;
    setLoading(true);
    const off = getActiveLog(dataRef, setLogs, setLoading);

    return () => off();
  }, [dataRef]);

  return { logs, loading }
}

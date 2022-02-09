import { onValue, query, ref, or, orderByKey, limitToFirst, limitToLast } from "firebase/database";
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";

const useHistory = (dayLimit) => {
   const db = useDatabase()
   const user = useUser()
   const [status, setStatus] = useState('loading');
   const [data, setData] = useState({});
   
   const workoutHistoryRef = ref(db, `users/${user.data.uid}/workoutHistory`)

   // Subscribe to history data
   useEffect(() => {
      setStatus('loading')
      const historyListener = onValue(query(workoutHistoryRef, limitToLast(dayLimit)), snapshot => {
         if (!snapshot.exists()) {
            setStatus('success')
            return
         }

         let workoutHistory = snapshot.val()

         // Process snapshot
         let count = 0
         snapshot.forEach(workout => {
            //console.log(workout.val());
            count++
         })

         setData(workoutHistory)
         setStatus('success')
      })

      return () => historyListener()
      
   }, [dayLimit]);

   // Create api for history data
   const api = {
      removeWorkout: () => {}
   }

   return { status, data, api }
}

export {
   useHistory
}
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";
import { get, ref, child, onValue } from "@firebase/database";

// import firebase from 'firebase'


const useHistory = () => {
   const db = useDatabase()
   const user = useUser()
   const workoutHistoryRef = ref(db, `users/${user.data.uid}/history`)
   const [status, setStatus] = useState('loading');
   const [workoutHistory, setWorkoutHistory] = useState({});


   // Get history once
   useEffect(() => {
      onValue(workoutHistoryRef, snapshot => {
         if (!snapshot.exists()) {
            setStatus('success')
            return
         }

         setWorkoutHistory(snapshot.val())
         setStatus('success')
      })
   }, []);


   // Create api for history data
   const api = {
      removeWorkout: () => {}
   }

   return { status, data: workoutHistory, api }
}

export {
   useHistory
}
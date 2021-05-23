import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire"

const useWorkout = () => {
   // State
   const [status, setStatus] = useState('loading'); // loading | success | error
   const [data, setData] = useState(null)

   // Hooks
   const user = useUser()
   const db = useDatabase()

   // Subscribe to the current user workout
   useEffect(() => {
      const workout = db.ref(`users/${user.data.uid}/workout`)

      workout.on('value', (snapshot) => {
         // If the user doesn't have a current workout, create one
         if (!snapshot.exists()){
            workout.set({
               dateStarted: Date().toString()
            })
         } else {
            setData(snapshot.val())
         }
      })
   });

   return { status, data }

}
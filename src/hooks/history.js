import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";
// import firebase from 'firebase'


const useHistory = () => {
   const db = useDatabase()
   const user = useUser()
   const workoutHistoryRef = db.ref(`users/${user.data.uid}/history`)
   const [status, setStatus] = useState('loading');
   const [workoutHistory, setWorkoutHistory] = useState(null);


   // Get history once
   useEffect(() => {
      workoutHistoryRef.once('value').then(snapshot => {
         console.log(snapshot.val())

         setWorkoutHistory(snapshot.val())
         setStatus('done')
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
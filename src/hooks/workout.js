import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire"

const useWorkout = () => {
   // State
   const [status, setStatus] = useState('loading'); // loading | ok | error
   const [data, setData] = useState(null)

   // Hooks
   const user = useUser()
   const db = useDatabase()
   
   // Variables
   const workout = db.ref(`users/${user.data.uid}/workout`)
   const exList = db.ref(`users/${user.data.uid}/workout/exercises`)


   // Subscribe to the child add and remove
   useEffect(() => {
      // Listen for changes
      workout.on('value', snapshot => {
         if (!snapshot.exists()) {
            console.log("No workout found, add")
            // Add a workout
            workout.set({
               dateStarted: new Date().toString(),
               numExInProgress: 0,
               numExCompleted: 0
            })
         } else {
            setData(snapshot.val())
            setStatus('ok')
         }
      })

      return () => {
         workout.off()
      }
   }, []);

   // API
   const api = {
      addWorkout: () => {},
      removeWorkout: () => {},
      addExercise: (name) => {
         console.log("Add")
         let newExKey = exList.push().key
         let newExRef = db.ref(`users/${user.data.uid}/workout/exercises/${newExKey}`)

         newExRef.set({
            name: name,
            complete: false
         })
      },
      removeExercise: () => {},
      addSet: () => {},
      removeSet: () => {},
      updateSet: () => {}
   }   

   return { status, data, api }

}

const useExercise = (eid) => {
   // State
   const [status, setStatus] = useState('loading');
   const [data, setData] = useState(null);

   // Hooks
   const user = useUser()
   const db = useDatabase()

   // Subscribe to changes to this exercise
   useEffect(() => {
      const exercise = db.ref(`users/${user.data.uid}/workout/${eid}`)

      exercise.on('value', (snapshot) => {
         let data = snapshot.val()

         // Check if data exists
         if (data) {
            setData(data)
            setStatus('ok')
         } else {
            setData(null)
            setStatus('error')
         }
      })
   });

   // API
   const api = {
      addSet: () => {},
      removeSet: () => {},
      updateSet: () => {},
      completeExercise: () => {},
   }

   return { status, data, api }
}

export {
   useWorkout,
   useExercise
}
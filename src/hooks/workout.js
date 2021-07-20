import { useEffect, useState } from "react";
import { useDatabase, useFirebaseApp, useUser } from "reactfire"
import firebase from 'firebase'

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

   // Subscribe to the current workout
   useEffect(() => {
      workout.on('value', snapshot => {
         // Create a new workout if none is found
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

      // Close subscription once unmounted
      return () => workout.off()
   }, []);

   // API
   const api = {
      completeWorkout: () => {
         console.log("Workout -- Complete workout")
      },

      addExercise: (name, measures) => {
         console.log(`Workout -- Adding exercise: ${name}`)

         let updates = {};

         updates[`/exercises/${name}`] = {
            name: name,
            complete: false,
            measures: measures,
         };
         updates['/numExInProgress'] = firebase.database.ServerValue.increment(1);

         workout.update(updates);
      },

      removeExercise: (name) => {
         console.log(`Workout -- Removing exercise: ${name}`)

         let updates = {}

         updates[`exercises/${name}`] = null
         updates['/numExInProgress'] = firebase.database.ServerValue.increment(-1);
         
         workout.update(updates);
      },

      completeExercise: (name) => {
         console.log(`Workout -- Completing exercise: ${name}`)

         let updates = {}

         updates[`exercises/${name}/complete`] = true
         updates['/numExInProgress'] = firebase.database.ServerValue.increment(-1)
         updates['/numExCompleted'] = firebase.database.ServerValue.increment(1)

         workout.update(updates)
      },

      unCompleteExercise: (name) => {
         console.log(`Workout -- Un-completing exercise: ${name}`)

         let updates = {}

         updates[`exercises/${name}/complete`] = false
         updates['/numExInProgress'] = firebase.database.ServerValue.increment(1)
         updates['/numExCompleted'] = firebase.database.ServerValue.increment(-1)

         workout.update(updates)
      },

      addSet: (exName) => {
         console.log(`Workout -- Adding set to exercise: ${exName}`)

         let newSet = Object.values(data.exercises[exName].measures).reduce((acc, m) => {
            acc[m] = 0
            return acc
         }, {})
         let newSetList = data.exercises[exName].sets ? 
            [...Object.values(data.exercises[exName].sets)] : []
            
         newSetList.push(newSet)

         console.log(newSetList)

         let updates = {}
         updates[`/exercises/${exName}/sets`] = newSetList

         workout.update(updates)
      },

      removeSet: (exName) => {
         console.log(`Workout -- Removing set from exercise: ${exName}`)

         let newSets = data.exercises[exName].sets
         newSets.pop(-1)

         let updates = {}
         updates[`/exercises/${exName}/sets`] = newSets
         workout.update(updates)
      },

      updateSet: (exName, setInd, measure, newVal) => {
         console.log(`Workout -- Updating set for exercise: ${exName}`)

         let updates = {}
         updates[`/exercises/${exName}/sets/${setInd}/${measure}`] = newVal

         workout.update(updates)
      }
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
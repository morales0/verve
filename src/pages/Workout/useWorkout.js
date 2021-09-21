import { useEffect, useState } from "react";
import { useDatabase, useDatabaseList, useFirebaseApp, useUser, useDatabaseObject} from "reactfire"
import firebase from 'firebase/compat/app'
import { useHistory } from "react-router-dom";
import { onValue, ref, set } from "@firebase/database";

/* const useWorkoutOLD = () => {
   // State
   const [status, setStatus] = useState('loading'); // loading | ok | error
   const [data, setData] = useState(null)
   const [availEx, setAvailEx] = useState([]);

   // Hooks
   const history = useHistory()
   const user = useUser()
   const db = useDatabase()
   
   // Variables
   const workoutRef = ref(db, `users/${user.data.uid}/workout`)
   const ogExRef = ref(db, "original-exercises")
   const exList = ref(db, `users/${user.data.uid}/workout/exercises`)

   // Subscribe to the current workout
   useEffect(() => {
      onValue(workoutRef, snapshot => {
         // Create a new workout if none is found
         if (!snapshot.exists()) {
            console.log("No workout found, add")
            // Add a workout
            set(workoutRef, {
               dateStarted: new Date().toString(),
               numExInProgress: 0,
               numExCompleted: 0
            })

            // Set user to working out
            db.ref(`users/${user.data.uid}/isWorkingOut`).set(true)
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

         // Stop listening to workout
         workout.off()

         // Save workout in history
         const workoutHistory = db.ref(`users/${user.data.uid}/history`)
         workoutHistory.push({
            ...data,
            dateEnded: new Date().toString()
         })

         // Remove workout
         workout.remove()

         // Set user to not working out
         db.ref(`users/${user.data.uid}/isWorkingOut`).set(false)

         // Send user to a summary page, then to the home page
         history.push("/home")
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
} */

const useWorkout = () => {
   const db = useDatabase()
   const user = useUser()
   const workoutRef = ref(db, `users/${user.data.uid}/workout`)
   const exercisesRef = ref(db, `users/${user.data.uid}/workout-exercises`)

   // const { status: workoutStatus, data: workoutData } = useDatabaseList(workoutRef)
   const workoutSub = useDatabaseObject(workoutRef)
   const exercisesSub = useDatabaseList(exercisesRef)

   useEffect(() => {
      console.log("Workout", workoutSub)

      if (workoutSub.status === "success") {
         // Create a workout if none exists
         if (!workoutSub.data.snapshot.exists()) {
            console.log("Adding workout");
            set(workoutRef, {
               dateStarted: new Date().toString(),
               numExInProgress: 0,
               numExCompleted: 0
            })

            set(ref(db, `users/${user.data.uid}/isWorkingOut`), true)
         } else {
            console.log(workoutSub.data.snapshot.val())
         }
      }
   }, [workoutSub]);

   useEffect(() => {
      console.log("Exercises", exercisesSub)
      
   }, [exercisesSub.status]);

   return { 
      status: workoutSub.status,
      workout: workoutSub.data,
      exercises: exercisesSub.data
   }
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
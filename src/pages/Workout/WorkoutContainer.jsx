import { get, ref, set, update, increment, push, remove, onValue, off, query, limitToLast } from "firebase/database";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { useDatabase, useDatabaseList, useDatabaseObject, useUser } from "reactfire";
import { useWorkingOutCheck } from "services/firebase/index";
import { toDateKey } from "util/date";
import WorkoutView from "./WorkoutView";

// Create context for workout
const WorkoutContext = React.createContext(null)

// Create provider
const WorkoutContainer = (props) => {
   const history = useHistory()
   // Firebase state
   const db = useDatabase()
   const user = useUser()
   const workoutRef = ref(db, `users/${user.data.uid}/workout`)
   const [workoutData, setWorkoutData] = useState({ status: 'loading', data: null })

   // Page state
   const [completing, setCompleting] = useState(false);
   const [exToAdd, setExToAdd] = useState([]);
   const [currScreen, setCurrScreen] = useState('loading');

   // Subscribe to workout ref
   useEffect(() => {
      const workoutListener = onValue(workoutRef, snapshot => {
         if (!snapshot.exists()) {
            setWorkoutData({ status: 'error', data: null })
         }

         let data = snapshot.val()

         // Check if there is a current workout
         let inProgress = data['inProgress']

         // Check status of workout
         let workoutStatus = data['status']

         if (workoutStatus === 'new') {
            // Create a new workout
         } else if (workoutStatus === 'finalizing') {
            // Turn listener off, save data, send to home, set to finished
         } else if (workoutStatus === 'finished') {
            // Send to home and set to new?
         }

         // If not, set up parameters
         if (!inProgress) {
            setWorkoutData(curr => { return { ...curr, status: 'creating' } })
            setCurrScreen('add')

            let now = new Date()
            let time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

            set(workoutRef, {
               dateStarted: new Date().toString(),
               timeStarted: time,
               screen: "add",
               status: "new",
               inProgress: true
            }).catch(err => {
               console.error("Beginning a new workout failed", err)
            })
            // Update workout state as it changes
         } else {
            setWorkoutData({ status: 'success', data: data })

            if (data['currentExercise']) {
               setCurrScreen('exercise')
            } else {
               setCurrScreen('add')
            }
         }
      })

      return () => workoutListener()
   }, []);

   // Populate exercises to add
   useEffect(() => {
      /* get(ogExRef).then(snapshot => {
         // Also get user's custom exercises
         const customExercisesRef = ref(db, `users/${user.data.uid}/custom-exercises/`)
         get(customExercisesRef).then(customSnapshot=>{
            if (customSnapshot.exists()){
               setExToAdd([...Object.values(snapshot.val()), ...Object.values(customSnapshot.val())])
            } else {
               setExToAdd(Object.values(snapshot.val()))
            }
         })
      }) */

      // Get exercises from user's list
      const customExercisesRef = ref(db, `users/${user.data.uid}/custom-exercises/`)
      const customExListener = onValue(customExercisesRef, customSnapshot => {
         if (customSnapshot.exists()) {
            setExToAdd([...Object.values(customSnapshot.val()).sort((a, b) => a.name.localeCompare(b.name))])
         }
      })

      return () => customExListener()
   }, []);

   // Workout API
   const api = {
      // Exercise functions
      addExercise: (name, measures) => {
         const updates = {}

         let starterSets = []
         // Check if the history for this exercise exists
         const newExHistoryRef = ref(db, `users/${user.data.uid}/exerciseHistory/${name}/`)
         get(query(newExHistoryRef, limitToLast(1))).then(snapshot => {
            if (snapshot.exists()) {
               let data = Object.values(snapshot.val())
               starterSets = data[0]
            } else {
               // Create blank starting sets
               starterSets.push(
                  measures.reduce((acc, val) => {
                     acc[val] = ""
                     return acc
                  }, {})
               )
            }

            // Create current exercise
            updates[`/currentExercise/`] = {
               name: name,
               measures: measures,
               sets: starterSets
            };

            update(workoutRef, updates)
         })
      },
      removeExercise: () => {
         const updates = {}

         updates[`/currentExercise/`] = null;

         update(workoutRef, updates)
      },
      completeExercise: (name, sets) => {
         const updates = {}

         updates[`/completedExercises/${name}/`] = sets
         updates['/currentExercise/'] = null

         update(workoutRef, updates)
      },
      uncompleteExercise: (name) => {
         const updates = {}

         updates[`/exercises/${name}/complete`] = false;

         update(workoutRef, updates)
      },

      // Workout functions
      completeWorkout: () => {
         setCompleting(true)
         off(workoutRef)

         const dateStarted = new Date(workoutData.data.dateStarted)
         const dateEnded = new Date()
         const timeEnded = dateEnded.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

         // Create unique date key (by day)
         let dateKey = toDateKey(dateStarted)

         // Unique timekey within day
         let timeKey = dateStarted.toLocaleTimeString()

         // Save workout history
         set(ref(db, `users/${user.data.uid}/workoutHistory/${dateKey}/${timeKey}`), {
            ...workoutData.data,
            dateEnded: dateEnded.toString(),
            timeEnded: timeEnded,
            dateKey: dateKey,
            timeKey: timeKey,
            inProgress: false
         })

         // Save each exercise history
         Object.entries(workoutData.data['completedExercises']).forEach(([name, sets]) => {
            set(ref(db, `users/${user.data.uid}/exerciseHistory/${name}/${dateKey}-${timeKey}`), sets)
         })

         // Reset workout
         set(workoutRef, {
            inProgress: false
         }).then(() => {
            // Send user to a summary page, then to the home page
            history.push("/home")
         })
      },
      cancelWorkout: () => {
         setCompleting(true)

         // Close listener
         off(workoutRef)

         set(workoutRef, {
            inProgress: false
         }).then(() => {
            // Send user to a summary page, then to the home page
            history.push("/home")
         })
      },
      restartWorkout: () => { alert("Not implemented yet") },
      updateWorkout: () => { alert("Not implemented yet") },
   }

   // If in the completion phase
   if (completing) {
      return (
         <div>Finalizing workout...</div>
      )
   }

   // Check if workout exists
   if (workoutData.status === "loading") {
      return (
         <div>Finding your workout...</div>
      )
   } else if (workoutData.status === 'creating') {
      return (
         <div>Creating your workout...</div>
      )
   }

   // Serve state and setters to the workout view
   return (
      <WorkoutContext.Provider value={{
         api: api,
         pageState: {
            exToAdd: exToAdd,
            currScreen: currScreen,
            setCurrScreen: setCurrScreen
         },
         workoutData: workoutData
      }}>
         <WorkoutView />
      </WorkoutContext.Provider>
   );
}

// Create workout hook
const useWorkout = () => {
   const workoutContext = useContext(WorkoutContext)

   return {
      ...workoutContext
   }
}

export {
   WorkoutContainer,
   useWorkout
}
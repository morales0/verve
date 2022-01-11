import { get, ref, set, update, increment, push, remove, onValue, off } from "@firebase/database";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { useDatabase, useDatabaseList, useDatabaseObject, useUser } from "reactfire";
import { useWorkingOutCheck } from "services/firebase/index";
import WorkoutView from "./WorkoutView";

// Create context for workout
const WorkoutContext = React.createContext(null)

// Create provider
const WorkoutContainer = (props) => {
   const history = useHistory()
   // Firebase state
   const db = useDatabase()
   const user = useUser()
   const ogExRef = ref(db, 'original-exercises')
   const userRef = ref(db, `users/${user.data.uid}`)
   const workoutRef = ref(db, `users/${user.data.uid}/workout`)
   const exercisesRef = ref(db, `users/${user.data.uid}/workout/exercises`)
   const [workoutData, setWorkoutData] = useState({status: 'loading', data: null})

   // Page state
   const [completing, setCompleting] = useState(false);
   const [exPopUpOpen, setExPopUpOpen] = useState(false);
   const [exToAdd, setExToAdd] = useState([]);

   // Subscribe to workout ref
   useEffect(() => {
      const workoutListener = onValue(workoutRef, snapshot => {
         console.log("workoutData onvalue");
         if (!snapshot.exists()) {
            setWorkoutData({status: 'error', data: null})
         }

         let data = snapshot.val()

         // Check if there is a current workout
         let inProgress = data['inProgress']

         // If not, set up parameters
         if (!inProgress) {
            setWorkoutData(curr => {return {...curr, status: 'creating'}})

            let now = new Date()
            let time = now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});

            set(workoutRef, {
               dateStarted: new Date().toString(),
               timeStarted: time,
               numExInProgress: 0,
               numExCompleted: 0,
               inProgress: true
            }).catch(err => {
               console.error("Beginning a new workout failed", err)
            })
         // Update workout state
         } else {
            setWorkoutData({status: 'success', data: data})
         }
      })

      return () => workoutListener()
   }, []);

   // Populate current exercises
   useEffect(() => {
      get(ogExRef).then(snapshot => {
         // Also get user's custom exercises
         const customExercisesRef = ref(db, `users/${user.data.uid}/custom-exercises/`)
         get(customExercisesRef).then(customSnapshot=>{
            if (customSnapshot.exists()){
               setExToAdd([...Object.values(snapshot.val()), ...Object.values(customSnapshot.val())])
            } else {
               setExToAdd(Object.values(snapshot.val()))
            }
         })
      })
   }, []);

   // Workout API
   const api = {
      // Exercise functions
      // TODO: Filter ex to add when adding and removing exercises
      addExercise: (name, measures) => {
         const updates = {}

         // Create starting sets
         const starterSets = []
         starterSets.push(
            measures.reduce((acc, val) => {
               acc[val] = 0
               return acc
            }, {})
         )

         updates[`/exercises/${name}`] = {
            name: name,
            complete: false,
            measures: measures,
            sets: starterSets
         };
         updates['/numExInProgress'] = increment(1)

         update(workoutRef, updates)
      },
      removeExercise: (name) => {
         const updates = {}

         updates[`/exercises/${name}`] = null;
         updates['/numExInProgress'] = increment(-1)

         update(workoutRef, updates)
      },
      completeExercise: (name) => {
         const updates = {}

         updates[`/workout-exercises/${name}/complete`] = true;
         updates['/workout/numExInProgress'] = increment(-1)
         updates['/workout/numExCompleted'] = increment(1)

         update(userRef, updates)
      },
      uncompleteExercise: (name) => {
         const updates = {}

         updates[`/workout-exercises/${name}/complete`] = false;
         updates['/workout/numExInProgress'] = increment(1)
         updates['/workout/numExCompleted'] = increment(-1)

         update(userRef, updates)
      },

      // Set functions
      // TODO: Initialize set to last recorded set value
      addSetToExercise: (exName, index, oldSet) => {
         const updates = {}

         updates[`/workout-exercises/${exName}/sets/${index}`] = oldSet

         update(userRef, updates)
      },
      removeSetFromExercise: (exName, index) => {
         const updates = {}

         updates[`/workout-exercises/${exName}/sets/${index}`] = null

         update(userRef, updates)
      },
      updateSetInExercise: (exName, index, measure, newVal) => {
         const updates = {}

         updates[`/workout-exercises/${exName}/sets/${index}/${measure}`] = newVal

         update(userRef, updates)
      },

      // Workout functions
      completeWorkout: () => {
         setCompleting(true)
         const endDate = new Date().toString()

         // Save workout in history
         const workoutHistory = ref(db, `users/${user.data.uid}/history`)
         let histRef = push(workoutHistory, {
            dateEnded: endDate
         })
         const exerciseHistory = ref(db, `users/${user.data.uid}/exercise-history`)

         get(ref(db, `users/${user.data.uid}/workout-exercises`)).then(snapshot => {
            let exercises = snapshot.val()

            Object.values(exercises).forEach(ex => {
               let currExRef = ref(db, `users/${user.data.uid}/exercise-history/${ex.name}`)
               let exRef = push(currExRef, {
                  date: endDate,
                  sets: ex.sets
               })

               // Save key in history object
               console.log(histRef)
               let currHistRef = ref(db, `users/${user.data.uid}/history/${histRef.key}/exercises/${ex.name}`)
               set(currHistRef, exRef.key)
            })
         })

         // Remove workout
         remove(exercisesRef)
         remove(workoutRef)

         // Set user to not working out
         set(ref(db, `users/${user.data.uid}/isWorkingOut`), false).then(() => {
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
   if (workoutData.status === "loading"){
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
            exToAdd: exToAdd
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
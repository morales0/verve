import { get, ref, set, update, increment, push, remove } from "@firebase/database";
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
   const exercisesRef = ref(db, `users/${user.data.uid}/workout-exercises`)
   const workoutData = useDatabaseObject(workoutRef)
   const isWorkingOut = useWorkingOutCheck()
   const [completing, setCompleting] = useState(false);

   // Page state
   const [exPopUpOpen, setExPopUpOpen] = useState(false);
   const [ogEx, setOgEx] = useState([]);
   const [exToAdd, setExToAdd] = useState([]);

   // Create exercise if one doesn't exist
   useEffect(() => {
      console.log(isWorkingOut)
      if (!completing && (isWorkingOut.status === "success") && !(isWorkingOut.data)){
         console.log("Adding workout");
         set(workoutRef, {
            dateStarted: new Date().toString(),
            numExInProgress: 0,
            numExCompleted: 0
         }).then(() => {
            set(ref(db, `users/${user.data.uid}/isWorkingOut`), true)
         }).catch((err) => {
            console.error("Adding workout failed", err)
         })
      }
   }, [isWorkingOut]);

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

         updates[`/workout-exercises/${name}`] = {
            name: name,
            complete: false,
            measures: measures,
            sets: starterSets
         };
         updates['workout/numExInProgress'] = increment(1)

         update(userRef, updates)
      },
      removeExercise: (name) => {
         const updates = {}

         updates[`/workout-exercises/${name}`] = null;
         updates['/workout/numExInProgress'] = increment(-1)

         update(userRef, updates)
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
         console.log("Workout -- Complete workout")

         setCompleting(true)

         // Save workout in history
         const workoutHistory = ref(db, `users/${user.data.uid}/history`)
         push(workoutHistory, {
            dateEnded: new Date().toString()
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
         
         // Remove workout
         remove(exercisesRef)
         remove(workoutRef)

         // Set user to not working out
         set(ref(db, `users/${user.data.uid}/isWorkingOut`), false).then(() => {
            // Send user to a summary page, then to the home page
            history.push("/home")
         })
      },
      restartWorkout: () => { alert("Not implemented yet") },
      updateWorkout: () => { alert("Not implemented yet") },
   }

   // Workout Page Control
   const pageControl = {
      openExPopUp: () => setExPopUpOpen(true),
      closeExPopUp: () => setExPopUpOpen(false),
   }

   // If in the completion phase
   if (completing) {
      return (
         <div>Finalizing workout...</div>
      )
   }

   // Check if workout exists
   if (isWorkingOut.status === "loading"){
      return (
         <div>Loading your workout...</div>
      )
   } else if (isWorkingOut.data === "false") {
      return (
         <div>Creating workout...</div>
      )
   }

   return (
      <WorkoutContext.Provider value={{
         api: api,
         pageState: {
            exToAdd: exToAdd
         },
         workoutData: workoutData.data?.snapshot.val()
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
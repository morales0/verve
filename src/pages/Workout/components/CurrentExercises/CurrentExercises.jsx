import { off, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";
import { useWorkout } from "../../WorkoutContainer";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";
import { AddExerciseBtn, CancelWorkoutBtn, CurrentExercisesContainer, Header } from "./styles";

const CurrentExercises = ({ openExPopUp }) => {
   // useExercises?
   const db = useDatabase()
   const user = useUser()
   const exercisesRef = ref(db, `users/${user.data.uid}/workout-exercises`)
   const [exercises, setExercises] = useState({status: "loading", data: null});
   const { api } = useWorkout()

   // Subscribe to exercise changes
   useEffect(() => {
      onValue(exercisesRef, snapshot => {
         if (snapshot.exists()) {
            setExercises({status: "success", data: Object.values(snapshot.val())})
         } else {
            setExercises({status: "success", data: null})
         }
      })

      return () => off(exercisesRef)
   }, []);


   console.log("--- <CurrentExercises /> Render")

   // Functions
   const cancelWorkout = () => api.cancelWorkout()

   return (
      <CurrentExercisesContainer>
         <Header>
            <h3>My Workout</h3>
            <CancelWorkoutBtn onClick={cancelWorkout}>
               Cancel
            </CancelWorkoutBtn>
         </Header>
         <ExerciseGrid
            status={exercises.status}
            exercises={exercises.data?.filter(ex => !ex.complete)}
            emptyMessage="Add exercises below!"
         />
         <AddExerciseBtn onClick={openExPopUp}>
            Add Exercise
         </AddExerciseBtn>
      </CurrentExercisesContainer>
   );
}

export default CurrentExercises;
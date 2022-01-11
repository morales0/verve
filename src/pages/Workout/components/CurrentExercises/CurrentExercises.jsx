import { off, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";
import styled from "styled-components";
import { useWorkout } from "../../WorkoutContainer";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";
import { AddExerciseBtn, CancelWorkoutBtn, StyledCurrentExercises, Header } from "./styles";
import AddExerciseScreen from '../AddExerciseScreen/AddExerciseScreen'

const CurrentExercises = ({ openExPopUp }) => {
   // useExercises?
   const db = useDatabase()
   const user = useUser()
   const { api, workoutData } = useWorkout()
   const [addExerciseFlag, setAddExerciseFlag] = useState(false);

   console.log("--- <CurrentExercises />")
   console.log(workoutData);


   // Functions
   const cancelWorkout = () => api.cancelWorkout()

   const exercisesList = () => {
      if (!workoutData.data || !workoutData.data.exercises) {
         return []
      }

      return Object.values(workoutData.data.exercises)
   }

   return (
      <StyledCurrentExercises addExerciseFlag={addExerciseFlag}>
         <Header>
            <h3>My Workout</h3>
            <CancelWorkoutBtn onClick={cancelWorkout}>
               Cancel
            </CancelWorkoutBtn>
         </Header>
         {
            addExerciseFlag ? (
               <AddExerciseScreen close={() => setAddExerciseFlag(false)} />
            ) : (
               <ExerciseGrid
                  status={workoutData.status}
                  exercises={exercisesList().filter(ex => !ex.complete)}
                  emptyMessage="Add exercises below!"
               />
            )
         }
         {
            !addExerciseFlag &&
            <AddExerciseBtn onClick={() => setAddExerciseFlag(!addExerciseFlag)}>
               Add Exercise
            </AddExerciseBtn>
         }
      </StyledCurrentExercises>
   );
}




export default CurrentExercises;
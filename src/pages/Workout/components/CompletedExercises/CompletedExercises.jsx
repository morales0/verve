import { off, onValue, ref } from "@firebase/database";
import { useWorkout } from "pages/Workout/WorkoutContainer";
import React, { useEffect, useState } from "react";
import { useDatabase, useDatabaseList, useUser } from "reactfire";
import styled from "styled-components/macro";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";
import { CompletedExercisesContainer, Header } from "./styles";

const CompletedExercises = ({ ...rest }) => {
   const db = useDatabase()
   const user = useUser()
   const exercisesRef = ref(db, `users/${user.data.uid}/workout-exercises`)
   const [exercises, setExercises] = useState({status: "loading", data: null});

   const { api, workoutData } = useWorkout()

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

   console.log("--- <CompletedExercises /> Re-render")

   return (
      <CompletedExercisesContainer>
         <Header>
            <h4>Completed</h4>
            {
               workoutData && workoutData.numExCompleted > 0 && workoutData.numExInProgress === 0 &&
               <FinishBtn onClick={api.completeWorkout}>
                  Finish
               </FinishBtn>
            }
         </Header>
         <ExerciseGrid 
            status={exercises.status}
            exercises={exercises.data?.filter(ex => ex.complete)}
            emptyMessage="Finish some exercises!"
         />
      </CompletedExercisesContainer>
   );
}
 
export default React.memo(CompletedExercises);
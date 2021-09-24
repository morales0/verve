import { off, onValue, ref } from "@firebase/database";
import { useWorkout } from "pages/Workout/WorkoutContainer";
import React, { useEffect, useState } from "react";
import { useDatabase, useDatabaseList, useUser } from "reactfire";
import styled from "styled-components/macro";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";

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

const CompletedExercisesContainer = styled.div`
   
`

const Header = styled.header`
   display: flex;
   justify-content: space-between;
`

const FinishBtn = styled.button`
   padding: .5rem .6rem;
   border: 1px solid #59b751;
   background-color: #f9f9f9;
`
 
export default React.memo(CompletedExercises);
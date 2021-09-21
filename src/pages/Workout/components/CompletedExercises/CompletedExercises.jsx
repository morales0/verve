import { ref } from "@firebase/database";
import { useWorkout } from "pages/Workout/WorkoutContainer";
import React, { useEffect } from "react";
import { useDatabase, useDatabaseList, useUser } from "reactfire";
import styled from "styled-components/macro";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";

const CompletedExercises = ({ ...rest }) => {
   const db = useDatabase()
   const user = useUser()
   const exercisesRef = ref(db, `users/${user.data.uid}/workout-exercises`)
   const exercises = useDatabaseList(exercisesRef)

   const { api, workoutData } = useWorkout()

   console.log("<CompletedExercises /> Re-render", workoutData)

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
            exercises={exercises.data?.map(ex => ex.snapshot.val())
               .filter(ex => ex.complete)}
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
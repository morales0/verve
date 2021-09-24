import { off, onValue, ref } from "@firebase/database";
import { Button } from "components";
import { useEffect, useState } from "react";
import { useDatabase, useDatabaseList, useUser } from "reactfire";
import styled from "styled-components/macro";
import { useWorkout } from "../../WorkoutContainer";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";

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

// styles

const CurrentExercisesContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
`

const Header = styled.header`
   display: flex;
   justify-content: space-between;
`

const AddExerciseBtn = styled(Button)`
	position: sticky;
	bottom: .5rem;
	display: flex;
	padding: .8rem;
	margin: .5rem;
	margin-left: auto;
	background: #f9f9f9;
	border: 1px dashed #999;
	box-shadow: 0 0 3px 1px rgba(0,0,0,15%);
	color: #555;
	font-size: .8rem;
`
 
const CancelWorkoutBtn = styled.button`
   padding: .5rem .6rem;
   border: 1px solid #c75757;
   background-color: #f9f9f9;

   cursor: pointer;
`

export default CurrentExercises;
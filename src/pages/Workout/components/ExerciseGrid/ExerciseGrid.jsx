import { useEffect } from "react";
import styled from "styled-components";
import Exercise from "../Exercise/NewExercise";

const testEx = {
   name: 'Leg Press',
   measures: {
      0: 'reps',
      1: 'lbs'
   },
   sets: {}
}

const ExerciseGrid = ({ status, exercises, emptyMessage }) => {
   
   console.log("<ExerciseGrid /> Re-render", exercises)

   return (
      <ExerciseGridStyle>
         {
            status === "loading" ? (
               <div>Loading exercises...</div>
            ) : status === "success" ? (
               exercises && exercises.length > 0 ? (
                  exercises?.map((ex, i) => (
                     <Exercise key={ex.name + i} {...ex} />
                  ))
               ) : (
                  <p>{emptyMessage}</p>
               )
            ) : (
               <div>Something went wrong...</div>
            )
         }
      </ExerciseGridStyle>
   );
}

// styles

const ExerciseGridStyle = styled.div`
   display: flex;
   flex-flow: row wrap;
   justify-content: flex-start;
   align-items: flex-start;
   align-content: flex-start;
   gap: .75rem;

   flex-grow: 1;
   padding: .5rem;

   background-size: 21px 21px;
   background-image: radial-gradient(circle, #bfbfbfab  1px, rgba(0, 0, 0, 0) 1px);

`
 
export default ExerciseGrid;
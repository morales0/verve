import Exercise from "../Exercise/Exercise";
import { ExerciseGridStyle } from "./styles";

const ExerciseGrid = ({ status, exercises, emptyMessage }) => {
   console.log("<ExerciseGrid /> Re-render")

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
 
export default ExerciseGrid;
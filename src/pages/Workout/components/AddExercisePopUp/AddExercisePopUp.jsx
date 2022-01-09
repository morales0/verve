import PopUp from "components/ui/PopUp/PopUp";
import { useWorkout } from "pages/Workout/WorkoutContainer";
import { useState } from "react";
import { ExerciseInfo } from "../ExerciseToolbar/components";
import CreateExerciseForm from "./CreateExerciseForm";

const AddExercisePopUp = (props) => {
   const { api, pageState } = useWorkout()
   const [tab, setTab] = useState(0);

   return (
      <PopUp {...props} >
         {
            tab === 1 &&
            <button onClick={() => setTab(0)}>
               Add Exercises
            </button>
         }
         {
            tab === 0 &&
            <button onClick={() => setTab(1)}>
               Create an Exercise
            </button>
         }
         {
            tab === 0 ? (
               <div>
                  <input type='text' placeholder='Search Exercises' />
                  <div>
                     {pageState.exToAdd?.map((ex) =>
                        <ExerciseInfo
                           key={ex.name + '-add'}
                           name={ex.name}
                           handleAdd={() => api.addExercise(ex.name, ex.measures)}
                        />
                     )}
                  </div>
               </div>
            ) : (
               <CreateExerciseForm
                  handleAdd={api.addExercise}
                  closePopUp={props.close}
               />
            )
         }
      </PopUp>
   );
}

export default AddExercisePopUp;
import { useWorkout } from "pages/Workout/WorkoutContainer";
import { useEffect } from "react";
import styled from "styled-components";


const Exercise = ({ name, sets, measures, complete, ...rest }) => {
   const { api } = useWorkout()

   console.log("<Exercise /> Re-render")

   // Functions
   const addSet = () => {
      let newSet = {}
      if (sets) {
         newSet = sets[sets.length - 1]
      } else {
         measures.forEach(m => newSet[m] = 0)
      }

      api.addSetToExercise(name, sets ? sets.length : 0, newSet)
   }
   const removeSet = () => api.removeSetFromExercise(name, sets.length - 1)
   const completeExercise = () => api.completeExercise(name)
   const removeExercise = () => api.removeExercise(name)
   const uncompleteExercise = () => api.uncompleteExercise(name)
   const updateSet = (index, m, val) => {
      api.updateSetInExercise(name, index, m, val)
   }

   return (
      <ExerciseStyle>
         <Header>
            <h4>{name}</h4>

            <div className="control_container">
               {
                  complete ? (
                     <ExerciseControlBtn onClick={uncompleteExercise}>
                        -
                     </ExerciseControlBtn>
                  ) : (
                     <>
                        {sets && <ExerciseControlBtn onClick={completeExercise}>+</ExerciseControlBtn>}
                        <ExerciseControlBtn onClick={removeExercise}>-</ExerciseControlBtn>
                     </>
                  )
               }
            </div>

         </Header>

         <Body>
            {
               !complete &&
               <div className="control_container">
                  <SetControlBtn onClick={addSet}>
                     +
                  </SetControlBtn>
                  <SetControlBtn disabled={!sets} onClick={removeSet}>
                     -
                  </SetControlBtn>
               </div>
            }
            {
               sets ? (
                  <div className="sets_wrapper">
                     <div className="setList_container">
                        {
                           Object.values(sets).map((set, i) => (
                              <div className="set_container" key={`${name}-set-${i}`}>
                                 {
                                    Object.entries(set).map(([m, val], j) =>
                                       complete ? (
                                          <h4 key={`${name}-set-${i}-m-${j}`}>
                                             {val}
                                          </h4>
                                       ) : (
                                          <SetValueInput
                                             key={`${name}-set-${i}-m-${j}`}
                                             value={val}
                                             onChange={(e) => updateSet(i, m, e.target.value)}
                                          />
                                       )
                                    )
                                 }
                              </div>
                           ))
                        }
                     </div>
                     <div className="measures_container">
                        {
                           measures.map((m, j) => (
                              <div key={`${name}-m-${j}-label`}>
                                 {m}
                              </div>
                           ))
                        }
                     </div>
                  </div>
               ) : (
                  <div className="empty_sets_message">
                     Add sets!
                  </div>
               )
            }
         </Body>
      </ExerciseStyle>
   );
}

// styles
const Body = styled.div`
   display: flex;
   background: white;

   & .control_container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 6px;

      border-right: 1px solid #adadad;
   }

   & .measures_container {
      display: flex;
      flex-direction: column;
      border-left: 1px solid #adadad;
      background-color: #f3eecd;
      font-style: italic;

      > div {
         display: flex;
         align-items: center;
         justify-content: flex-start;
         flex-grow: 1;

         padding: 0 5px;
         font-size: .7rem;
      }


   }

   & .sets_wrapper {
      display: flex;
      flex-grow: 1;

      overflow-x: hidden;
   }

   & .setList_container {
      display: flex;
      flex-grow: 1;

      overflow-x: auto;
   }

   & .set_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;

      + .set_container {
         border-left: 1px solid #e3e3e3;
      }
   }

   & .set_value {
      padding: 1rem;
   }

   & .empty_sets_message {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      padding: .5rem;
   }
`

// components?
const SetValueInputStyle = styled.input`
   height: 100%;
   width: 100%;
   min-width: 60px;
   text-align: center;
   border: none;
   font-size: 18px;
   color: #494949;
`

const SetValueInput = ({ ...rest }) => {

   return (
      <SetValueInputStyle type="number" {...rest} />
   )
}


export default Exercise;
import { useWorkout } from "pages/Workout/WorkoutContainer";
import { useEffect } from "react";
import styled from "styled-components";


const Exercise = ({ name, sets, measures, complete, ...rest }) => {
   const { api } = useWorkout()
   console.log(complete)

   console.log("<Exercise /> Re-render", sets)

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
const ExerciseStyle = styled.div`
   max-width: 400px;
   min-width: 200px;
   border: 1px solid #adadad;
`

const Header = styled.header`
   display: flex;
   justify-content: space-between;
   background-color: #dee3e6;
   border-bottom: 1px solid #adadad;

   & > h4 {
      padding: .2rem .5rem;
   }
`

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

const SetControlBtn = styled.button`
   padding: .5rem;
   margin: 3px;
   min-width: 46px;
   min-height: 46px;
   background-color: #dee3e6;
   border: 1px solid #cecece;

   cursor: pointer;

   &:hover {
      background-color: #b4bfc5
   }

   &:focus {

   }
`

const ExerciseControlBtn = styled.button`
   padding: .5rem;
   height: 100%;
   width: 40px;
   background-color: transparent;
   border: none;
   border-left: 1px solid #adadad;
   border-radius: 0;
   cursor: pointer;

   &:hover {

   }

   &:focus {

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
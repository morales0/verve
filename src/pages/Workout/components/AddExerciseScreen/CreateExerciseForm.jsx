import { set, ref, push, update } from "@firebase/database";
import { TextInput } from "components/ui";
import { useState } from "react";
import { useDatabase, useUser } from "reactfire";
import styled from "styled-components";



const CreateExerciseFormStyle = styled.form`
   overflow-y: auto;
`

const CheckboxOption = styled.div`
   display: flex;
   align-items: center;

   cursor: pointer;
   margin-bottom: .5rem;
   

`

const CheckboxInput = styled.input.attrs({ type: "checkbox" })`

   width: 25px;
   height: 25px;

   cursor: pointer;

`

const CheckboxLabel = styled.label`
   padding: 0 .4rem;

   cursor: pointer;

`

const StyledControlBtn = styled.button`
   padding: 0.3rem 0.5rem;
   border: none;
   background-color: ${props => props.theme.bg};
   color: inherit;
   font-size: .7rem;
   border: 1px solid steelblue;

   cursor: pointer;
`

const CreateExerciseForm = ({ children, editExercise, handleAdd, onAdd, switchTabTo }) => {
   const user = useUser()
   const db = useDatabase()
   const [name, setName] = useState(editExercise?.name || "");
   const [reps, setReps] = useState(false);
   const [weightSelected, setWeightSelected] = useState({ selected: false, choice: "lbs" });
   const [timeSelected, setTimeSelected] = useState({ selected: false, choice: "seconds" });
   const [distanceSelected, setDistanceSelected] = useState({ selected: false, choice: "miles" });

   const createExercise = (e) => {
      e.preventDefault()

      // Create exercise object
      const newExercise = {
         name: name,
         measures: []
      }

      if (weightSelected.selected) {
         newExercise.measures.push(weightSelected.choice)
      }
      if (timeSelected.selected) {
         newExercise.measures.push(timeSelected.choice)
      }
      if (distanceSelected.selected) {
         newExercise.measures.push(distanceSelected.choice)
      }
      if (reps) {
         newExercise.measures.push("reps")
      }

      // Add to user's custom exercise data
      const customExercisesRef = ref(db, `users/${user.data.uid}/custom-exercises/`)
      const newExRef = push(customExercisesRef)
      set(newExRef, { ...newExercise, id: newExRef.key })


      // Add to the workout
      handleAdd(newExercise.name, newExercise.measures)
      onAdd()
   }

   const updateExercise = (e) => {
      e.preventDefault()

      // Create exercise object
      const newExercise = {
         name: name,
         measures: []
      }

      if (weightSelected.selected) {
         newExercise.measures.push(weightSelected.choice)
      }
      if (timeSelected.selected) {
         newExercise.measures.push(timeSelected.choice)
      }
      if (distanceSelected.selected) {
         newExercise.measures.push(distanceSelected.choice)
      }
      if (reps) {
         newExercise.measures.push("reps")
      }

      const currExRef = ref(db, `users/${user.data.uid}/custom-exercises/${editExercise.id}`)
      // Set to new exercise
      const updates = {}
      updates['/name'] = newExercise.name
      updates['/measures'] = newExercise.measures
      update(currExRef, newExercise)
      clearForm()
      switchTabTo(0)
   }

   const clearForm = () => {
      setName("")
      setReps(false)
      setWeightSelected({ selected: false, choice: "lbs" });
      setTimeSelected({ selected: false, choice: "seconds" });
      setDistanceSelected({ selected: false, choice: "miles" });
   }

   const updateWeightSelection = (e, value) => {

   }

   const updateTimeSelection = (e, value) => {

   }

   const updateDistanceSelection = (e, value) => {

   }

   return (
      <CreateExerciseFormStyle onSubmit={(e) => editExercise ? updateExercise(e) : createExercise(e)}>
         <div>
            <label htmlFor="customExerciseName">Name:</label>
            <TextInput id="customExerciseName" value={name} onChange={(e) => setName(e.target.value)} />
         </div>
         <div>
            <h3>Measures</h3>
            <div >
               <CheckboxOption>
                  <CheckboxInput
                     id='exerciseMeasure-reps'
                     value="reps"
                     checked={reps}
                     onChange={(e) => setReps(e.target.checked)}
                  />
                  <CheckboxLabel htmlFor='exerciseMeasure-reps'>
                     Reps
                  </CheckboxLabel>
               </CheckboxOption>
               <CheckboxOption>
                  <CheckboxInput
                     type='checkbox' id='exerciseMeasure-weight'
                     onChange={(e) => setWeightSelected(prev => { return { ...prev, selected: e.target.checked } })}
                  />
                  <CheckboxLabel htmlFor='exerciseMeasure-weight'>
                     Weight
                  </CheckboxLabel>
               </CheckboxOption>
               <div style={{ marginLeft: ".7rem", display: weightSelected.selected ? "block" : "none" }}>
                  <h4>Units</h4>
                  <div style={{ marginLeft: ".5rem" }}>
                     <div>
                        <input
                           type='radio'
                           name="weightUnits"
                           id='exerciseMeasure-weight-unit-lbs'
                           value="lbs"
                           checked={weightSelected.choice === "lbs"}
                           onChange={(e) => setWeightSelected(prev => {
                              if (e.target.checked) {
                                 return { ...prev, choice: "lbs" }
                              } else {
                                 return prev
                              }
                           })}
                        />
                        <label htmlFor='exerciseMeasure-weight-unit-lbs'>
                           lbs
                        </label>
                     </div>
                     <div>
                        <input
                           type='radio'
                           name="weightUnits"
                           id='exerciseMeasure-weight-unit-kg'
                           value="kg"
                           checked={weightSelected.choice === "kg"}
                           onChange={(e) => setWeightSelected(prev => {
                              if (e.target.checked) {
                                 return { ...prev, choice: "kg" }
                              } else {
                                 return prev
                              }
                           })}
                        />
                        <label htmlFor='exerciseMeasure-weight-unit-kg'>
                           kg
                        </label>
                     </div>
                  </div>
               </div>
               <CheckboxOption>
                  <CheckboxInput type='checkbox' id='exerciseMeasure-time'
                     onChange={(e) => setTimeSelected(prev => { return { ...prev, selected: e.target.checked } })} />
                  <CheckboxLabel htmlFor='exerciseMeasure-time'>
                     Time
                  </CheckboxLabel>
               </CheckboxOption>
               <div style={{ marginLeft: ".7rem", display: timeSelected.selected ? "block" : "none" }}>
                  <h4>Units</h4>
                  <div style={{ marginLeft: ".5rem" }}>
                     <div>
                        <input
                           type='radio'
                           name="timeUnits"
                           id='exerciseMeasure-time-unit-seconds'
                           value="seconds"
                           checked={timeSelected.choice === "seconds"}
                           onChange={(e) => setTimeSelected(prev => {
                              if (e.target.checked) {
                                 return { ...prev, choice: "seconds" }
                              } else {
                                 return prev
                              }
                           })}
                        />
                        <label htmlFor='exerciseMeasure-weight-unit-seconds'>
                           seconds
                        </label>
                     </div>
                     <div>
                        <input
                           type='radio'
                           name="timeUnits"
                           id='exerciseMeasure-time-unit-minutes'
                           value="minutes"
                           checked={timeSelected.choice === "minutes"}
                           onChange={() => setTimeSelected(prev => { return { ...prev, choice: "minutes" } })}
                        />
                        <label htmlFor='exerciseMeasure-time-unit-minutes'>
                           minutes
                        </label>
                     </div>
                  </div>
               </div>
               <CheckboxOption>
                  <CheckboxInput type='checkbox' id='exerciseMeasure-distance'
                     onChange={(e) => setDistanceSelected(prev => { return { ...prev, selected: e.target.checked } })} />
                  <CheckboxLabel htmlFor='exerciseMeasure-distance' >
                     Distance
                  </CheckboxLabel>
               </CheckboxOption>
               <div style={{ marginLeft: ".7rem", display: distanceSelected.selected ? "block" : "none" }}>
                  <h4>Units</h4>
                  <div style={{ marginLeft: ".5rem" }}>
                     <div>
                        <input
                           type='radio'
                           name="distUnits"
                           id='exerciseMeasure-dist-unit-mi'
                           value="miles"
                           checked={distanceSelected.choice === "miles"}
                           onChange={() => setDistanceSelected(prev => { return { ...prev, choice: "miles" } })}
                        />
                        <label htmlFor='exerciseMeasure-dist-unit-mi'>
                           miles
                        </label>
                     </div>
                     <div>
                        <input
                           type='radio'
                           name="distUnits"
                           id='ename="distUnits" xerciseMeasure-dist-unit-km'
                           value="km"
                           checked={distanceSelected.choice === "km"}
                           onChange={() => setDistanceSelected(prev => { return { ...prev, choice: "km" } })}
                        />
                        <label htmlFor='exerciseMeasure-dist-unit-km'>
                           kilometers
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div>
            <StyledControlBtn type="submit">
               {editExercise ? "Update Exercise" : "Create and Add"}
            </StyledControlBtn>
         </div>
      </CreateExerciseFormStyle >
   )
}

export default CreateExerciseForm
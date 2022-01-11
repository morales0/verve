import { useWorkout } from 'pages/Workout/WorkoutContainer';
import { useState } from 'react';
import styled from 'styled-components'
import AddExerciseForm from './AddExerciseForm';
import CreateExerciseForm from './CreateExerciseForm';

const StyledAddExerciseScreen = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   flex-grow: 1;
   background-color: #555;
   border: 1px solid #ddd;
   overflow-y: hidden;

   & > * {
      padding: 0.5rem;
   }

   & > header {
      display: flex;
      justify-content: space-around;
   }

   & > .body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow-y: hidden;
   }

   & > .footer {
      display: flex;
      justify-content: flex-end;
      padding: .3rem 1rem;
      border-top: 1px solid #aaa;
   }
`

const StyledTab = styled.button`
   background: none;
   border: none;
   color: inherit;
   border-bottom: 1px solid ${props => props.selected ? 'white' : 'transparent'};
   cursor: pointer;
`

const Tab = ({ children, selected, onClick }) => {
   return (
      <StyledTab selected={selected} onClick={onClick}>
         <h2>{children}</h2>
      </StyledTab>
   )
}

const StyledAddTab = styled.div`
   

`

const StyledCreateTab = styled.div`
   
`

const StyledControlBtn = styled.button`
   padding: 0.3rem 0.5rem;
   border: none;
   background-color: ${props => props.theme.bg};
   color: inherit;
   font-size: .7rem;
   border: 1px solid ${props => props.type === 'cancel' ? 'red' : 'green'};

   cursor: pointer;
`

const AddExerciseScreen = ({ exercisesToAdd, close }) => {
   const { api, pageState } = useWorkout()
   const [currTab, setCurrTab] = useState(0);

   return (
      <StyledAddExerciseScreen>
         <header>
            <Tab selected={currTab === 0} onClick={() => setCurrTab(0)}>
               Add
            </Tab>
            <Tab selected={currTab === 1} onClick={() => setCurrTab(1)}>
               Create
            </Tab>
         </header>

         <div className='body'>
            {
               currTab === 0 ? (
                  <AddExerciseForm 
                     exercisesToAdd={pageState.exToAdd}
                     handleAdd={api.addExercise}
                  />
               ) : (
                  <CreateExerciseForm
                     handleAdd={() => console.log("okay...")}
                     closePopUp={() => console.log("okay...")}
                  />
               )
            }
         </div>
         <div className='footer'>
            <StyledControlBtn type='cancel' onClick={close}>Close</StyledControlBtn>
         </div>
      </StyledAddExerciseScreen>
   )
}

export default AddExerciseScreen
import { useState } from "react";
import styled from "styled-components";

const StyledAddExerciseForm = styled.div`
   display: flex;
   flex-direction: column;
   overflow-y: hidden;
`

const ExercisesContainer = styled.div`
   display: flex;
   flex-direction: column;
   overflow-y: auto;
`

const ExerciseAddBtn = styled.button`
   display: flex;
   align-items: stretch;
   width: fit-content;
   font-size: 1rem;
   margin-bottom: .5rem;
   

   color: inherit;
   background-color: transparent;
   border: none;
   border: 1px solid #b9b9b9;

   & > .plus {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .5rem;
      color: #90e790;
      border-right: 1px solid #999;
   }

   & > .name {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .5rem;
   }

`

const AddExerciseForm = ({ exercisesToAdd, handleAdd }) => {
   const [filterQuery, setFilterQuery] = useState('');

   const filterExercises = () => {
      return exercisesToAdd?.filter(e => 
         filterQuery === '' ||
         e.name.toLowerCase().startsWith(filterQuery.toLowerCase()) ||
         e.name.toLowerCase().includes(filterQuery.toLowerCase())
      )
   }

   return (
      <StyledAddExerciseForm>
         <input type="text" placeholder="Search for exercise" value={filterQuery} onChange={e => setFilterQuery(e.target.value)} />
         <ExercisesContainer>
            {
               filterExercises()?.map((e, i) => (
                  <ExerciseAddBtn onClick={() => handleAdd(e.name, e.measures)}>
                     <div className="plus">+</div>
                     <p className="name">{e.name}</p>
                  </ExerciseAddBtn>
               ))
            }
         </ExercisesContainer>
      </StyledAddExerciseForm>
   );
}
 
export default AddExerciseForm;
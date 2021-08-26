import { PageHeader } from "components"
import styled from "styled-components"


const DataPageHeader = styled(PageHeader)`
   padding: .6rem;
`


const StyledExerciseBar = styled.div`
   grid-row: span 2;
   
   background: #f1f1f1;

   & > header {
      display: grid;
      place-items: center;
      padding: .6rem;
   }

   & .headerTitle {

   }

   & > .exerciseBarContent_container {
      padding: .6rem;
   }
`

const ExerciseBar = () => {
   return (
      <StyledExerciseBar>
         <header>
            <h2 className='headerTitle'>
               Exercises
            </h2>
         </header>
         <div className='exerciseBarContent_container'>
            Content
         </div>
      </StyledExerciseBar>
   )
}

const DataContainer = styled.div`
   padding: .6rem;
`

export {
   ExerciseBar,
   DataPageHeader,
   DataContainer
}
import styled from "styled-components"

// Home layout styles
const HomeContainer = styled.div`

`

// Calendar styles/components
const Calendar = styled.div`
   padding: 1rem;
`

const Day = styled.div`
   

   border: 1px solid #a2a2a2;
   border-radius: 2px;

   & > header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: .5rem;
      border-bottom: 1px solid #b9b9b9;
   }

   & > .day_content {
      padding: 0.5rem;
   }

`

const WorkoutSummaryStyle = styled.div`

`

const WorkoutSummary = ({ ex }) => {

   return (
      <WorkoutSummaryStyle>
         <header>

         </header>
         <div>
            
         </div>
      </WorkoutSummaryStyle>
   )
}

export {
   HomeContainer,
   Calendar,
   Day,
   WorkoutSummary
}
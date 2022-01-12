import styled from "styled-components"
import RightArrow from 'images/right-arrow.png'
import { Link } from "react-router-dom"


// Home layout styles
const HomeContainer = styled.div`

`

// Calendar styles/components
const Calendar = styled.div`
   padding: 1rem;
   height: 100%;
   overflow-y: auto;
`

const Day = styled.div`

   margin-bottom: .7rem;
   

   /* border: 1px solid #a2a2a2;
   border-radius: 2px; */

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

const StyledWorkoutCard = styled(Link)`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: .5rem;
   margin-top: .4rem;
   border: 1px solid;

   color: inherit;
   text-decoration: none;
   border-color: #eee;

   & .time {
      font-size: .85rem;
      color: #b3b3b3;
   }

   & .continue {
      font-size: .85rem;
      color: #a1d6a1;
   }

   & .body {
      margin: 0.5rem 0;
   }

`

const WorkoutCard = ({ to, complete, inProgress, exercises, timeStarted, timeEnded, ...rest }) => {
   const exercisesList = () => {
      if (!exercises) {
         return []
      }

      return Object.values(exercises)
   }

   return (
      <StyledWorkoutCard to={to}>
         <div>
            {
               inProgress ? (
                  <p className='time'>
                     Started at {timeStarted}
                  </p>
               ) : (
                  <p className='time'>
                     {timeStarted} - {timeEnded}
                  </p>
               )
            }

            <div className='body'>
               {
                  exercisesList().map((ex, i) => <div key={`ex-${i}-${ex.name}`}>{ex.name}</div>)
               }
            </div>
            {
               inProgress && (
                  <p className='continue'>Click to continue</p>
               )
            }
         </div>
         {
            inProgress &&
            <div>
               <img src={RightArrow} alt='right arrow' height={25} />
            </div>
         }

      </StyledWorkoutCard>
   )
}

export {
   HomeContainer,
   Calendar,
   Day,
   WorkoutSummary,
   WorkoutCard
}
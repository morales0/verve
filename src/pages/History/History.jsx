import styled from "styled-components/macro";
import { flexRow, flexCol, flexCenter } from "layout";

// Styled components
const HistoryContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;

   & > header {
      padding: 1rem;
   }

   & > .historyMainContent_container {
      flex-grow: 1;
      padding: 1rem;
      overflow-y: auto;

      // background: #ffa2a240;

      .historyDay_container {
         & + & {
            margin-top: 1rem;
         }
      }

      .workoutListDay_container {
         display: flex;
      }
   }

   // DEV
   & > * {
      // border: 1px solid #333;
   }

`

const WorkoutDisplayContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: .5rem;
   border: 1px solid #555;

   width: 250px;
   height: 325px;

   & + & {
      margin-left: 1rem;
   }
`


// History component
const History = (props) => {
   return (
      <HistoryContainer>
         <header css={`${flexRow}`}>
            Header
         </header>

         <div className="historyMainContent_container">
            <div className="historyDay_container">
               <h2>Today</h2>
               <div className="workoutListDay_container">
                  <WorkoutDisplayContainer>Workout 1</WorkoutDisplayContainer>
                  <WorkoutDisplayContainer>Workout 2</WorkoutDisplayContainer>
               </div>
            </div>

            <div className="historyDay_container">
               <h2>Yesterday</h2>
               <div className="workoutListDay_container">
                  <WorkoutDisplayContainer>Workout 1</WorkoutDisplayContainer>
                  <WorkoutDisplayContainer>Workout 2</WorkoutDisplayContainer>
               </div>
            </div>

            <div className="historyDay_container">
               <h2>July 28</h2>
               <div className="workoutListDay_container">
                  <WorkoutDisplayContainer>Workout 1</WorkoutDisplayContainer>
                  <WorkoutDisplayContainer>Workout 2</WorkoutDisplayContainer>
               </div>
            </div>
         </div>
      </HistoryContainer>
   );
}

export default History;
import styled from "styled-components/macro";
import { flexRow, flexCol, flexCenter } from "layout";
import { useDatabase } from "reactfire";
import { useAuthCheck } from "context/auth";
import { useHistory } from "hooks/history";
import { Link } from "react-router-dom";

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

      .historyDay_container + .historyDay_container {
         margin-top: 1.5rem;
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
   const workoutHistory = useHistory()

   // Functions
   const isDateToday = (date) => {
      const now = new Date()

      return now.getDate() === date.getDate() &&
         now.getDay() === date.getDay() &&
         now.getMonth() === date.getMonth() &&
         now.getFullYear() === date.getFullYear()
   }

   // Turn dates into strings like "today", "yesterday", etc
   const dateToDetailString = (date) => {

   }

   const orgByDay = (workouts) => {
      const workoutsByDay = {}
      const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      workouts.forEach((workout) => {
         console.log(workout)
         const workoutDate = new Date(workout.dateStarted)

         const day = dayOfWeek[workoutDate.getDay()]
         const date = workoutDate.getDate()
         const month = workoutDate.getMonth()
         const year = workoutDate.getFullYear()

         const key = `${day}, ${month}-${date}-${year}`

         // Save the workouts in an array hashed by day
         if (key in workoutsByDay) {
            workoutsByDay[key].push(workout)
         } else {
            workoutsByDay[key] = [workout]
         }
      })

      return workoutsByDay
   }

   return (
      <HistoryContainer>
         <header css={`${flexRow}`}>
            Header
         </header>

         {
            workoutHistory.data ? (
               <div className="historyMainContent_container">
                  {
                     Object.entries(orgByDay(Object.values(workoutHistory.data))).map(([day, workoutList]) => (
                        <div className="historyDay_container">
                           <h2>{day}</h2>
                           <div className="workoutListDay_container">
                              {
                                 workoutList.map(workout => (
                                    <WorkoutDisplayContainer>
                                       <div>
                                          <input type="text" placeholder="We will use this to filter"/>
                                       </div>
                                       <div>
                                          {Object.keys(workout.exercises).map(ex => <h4>{ex}</h4>)}
                                       </div>
                                    </WorkoutDisplayContainer>
                                 ))
                              }
                           </div>
                        </div>
                     ))
                  }
               </div>
            ) : (
               <div>Everybody starts somewhere. Go on and <Link to="/workout">make history!</Link></div>
            )
         }

         {/* <div className="historyMainContent_container">
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
         </div> */}
      </HistoryContainer>
   );
}

export default History;
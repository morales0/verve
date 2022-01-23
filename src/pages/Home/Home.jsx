import { PageHeader } from 'components';
import { useAuthCheck } from 'context/auth';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import { useWorkingOutCheck } from "services/firebase/index"
import styled from 'styled-components';
import { toDateKey, toDateString } from 'util/date';
import { WorkoutLink } from './components/styled-components';
import useCurrentWorkout from 'hooks/workout.js'

import { HomeContainer, Calendar, Day, WorkoutCard } from './styles';
import { useHistory } from 'hooks/history';

const mockCurrentWorkout = {
   completed: true,
   exercises: [
      {
         name: 'Bench Press'
      },
      {
         name: 'Squat'
      }
   ]
}

const mockWorkout = {

}

const Home = () => {
   const user = useUser()
   const isWorkingOut = useWorkingOutCheck()
   const currWorkout = useCurrentWorkout()
   const userHistory = useHistory()

   const [today, setToday] = useState(new Date());
   const [calendarControl, setCalendarControl] = useState({amount: 3, type: 'days'});

   // fetch workouts list
   //const workouts = useWorkoutHistory()

   // workout by date state
   const [workoutsMap, setWorkoutsMap] = useState({

   });

   const workoutsToMap = (workoutsObj) => {
      let wMap = {}

      return wMap
   }

   const updateCalendarControl = (e) => {
      setCalendarControl({
         ...calendarControl,
         [e.target.name]: parseInt(e.target.value)
      })
   }

   return (
      <HomeContainer>
         <CalendarControl>
            <p>Last</p>
            <select name="amount" id="last-amount" value={calendarControl.amount} onChange={(e) => updateCalendarControl(e)}>
               <option value="3" >3</option>
               <option value="7">7</option>
               <option value="all">All</option>
            </select>
            <select name="type" id="last-type" value={calendarControl.type} onChange={(e) => updateCalendarControl(e)}>
               <option value="days">days</option>
               <option value="exercises">exercises</option>
            </select>
         </CalendarControl>
         <Calendar>
            {
               userHistory.status === 'loading' ? (
                  <div>Loading user history</div>
               ) : (
                  // Display the last three days
                  [...Array(calendarControl.amount)].map((_, i) => {
                     // Calculate the ith date
                     let currDay = new Date()
                     currDay.setDate(today.getDate() - i)

                     // Create the unique key
                     let dateKey = toDateKey(currDay)

                     // Retrieve the workouts for this day
                     let currWorkouts = []

                     if (userHistory.data[dateKey]) {
                        currWorkouts = Object.values(userHistory.data[dateKey]).reverse()
                     }

                     return (
                        <Day key={`day-${i}`}>
                           <header className="day_header">
                              <h2>{toDateString(currDay)}</h2>
                           </header>
                           <div className='day_content'>
                              {
                                 // If today, check for current workout
                                 i === 0 &&
                                 currWorkout.status === 'success' && (
                                    currWorkout.data?.inProgress ? (
                                       <WorkoutCard to="/workout" completed={false} {...currWorkout.data} />
                                    ) : (
                                       <WorkoutLink to="/workout">
                                          Start a new workout
                                       </WorkoutLink>
                                    )
                                 )

                              }
                              {
                                 currWorkouts.length === 0 ? (
                                    i !== 0 && <p>No data</p>
                                 ) : (
                                    currWorkouts.map((w, j) => (
                                       <WorkoutCard key={`day-${i}-workout-${j}`} {...w} to="#" />
                                    ))
                                 )
                              }
                           </div>
                        </Day>
                     )
                  })
               )
            }
         </Calendar>
      </HomeContainer>
   )
}


const CalendarControl = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   gap: .5rem;
   padding: 1rem 1rem 0 1rem;

   & > select {
      font-size: .85rem;
   }

`

const CalendarSelect = styled.select`
   
`

export default Home

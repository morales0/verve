import { PageHeader } from 'components';
import { useAuthCheck } from 'context/auth';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import { useWorkingOutCheck } from "services/firebase/index"
import { WorkoutLink } from './components/styled-components';

import './Home.scss';
import { HomeContainer, Calendar, Day } from './styles';

const Home = () => {
   const user = useUser()
   const isWorkingOut = useWorkingOutCheck()

   return (
      <HomeContainer>
         <Calendar>
            <Day>
               <header className="day_header">
                  <h2>Today</h2>
                  {
                     isWorkingOut.status === "success" &&
                     <WorkoutLink to="/workout">
                        {
                           (
                              isWorkingOut.data ? (
                                 'Continue workout'
                              ) : (
                                 'Start a new workout'
                              )
                           )
                        }
                     </WorkoutLink>
                  }
               </header>

               <div className="day_content">
                  No workouts for today... yet
               </div>
            </Day>
         </Calendar>
      </HomeContainer>
   )
}

export default Home

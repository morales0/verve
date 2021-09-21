import { PageHeader } from 'components';
import { useAuthCheck } from 'context/auth';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import { useWorkingOutCheck } from "services/firebase/index"
import { WorkoutLink } from './components/styled-components';

import './Home.scss';

const Home = () => {
   const user = useUser()
   const isWorkingOut = useWorkingOutCheck()

   return (
      <div className="Home_container">
         <PageHeader title="Home" />
         <div>Hey {user.data.displayName}, stay tuned for more content!</div>
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
      </div>
   )
}

const DashboardCard = (props) => {
   return (
      <div className="DashboardCard">
         {props.children}
      </div>
   )
}

export default Home

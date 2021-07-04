import React from 'react'
import { useAuth } from 'reactfire';

import './Home.css';

const Home = () => {
   const auth = useAuth()
   return (
      <div>
         <div>Francisco's Dashboard</div>
         <DashboardCard>
            <h2>Current Workout</h2>
            <div>
               20% done
            </div>
            <div>
               Time elapsed: XX
            </div>
         </DashboardCard>
         <div>
            <h2>Past Workouts</h2>
            <div>
               <p>Thu. Jul. 2</p>
               <div>
                  Exercises
               </div>
            </div>
         </div>
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

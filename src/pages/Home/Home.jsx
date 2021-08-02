import React from 'react'
import { useAuth } from 'reactfire';

import './Home.css';

const Home = () => {
   const auth = useAuth()
   return (
      <div>
         <div>User's Dashboard</div>
         <div>Not implemented</div>
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

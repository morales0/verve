import { PageHeader } from 'components';
import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';

import './Home.scss';



const Home = () => {
   const auth = useAuth()
   return (
      <div className="Home_container">
         <PageHeader title="Home" />
         <div>Not implemented</div>
         <Link to="/workout">
            Start new workout
         </Link>
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

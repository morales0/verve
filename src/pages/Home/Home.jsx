import { PageHeader } from 'components';
import { useAuthCheck } from 'context/auth';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useAuth, useDatabase } from 'reactfire';

import './Home.scss';



const Home = () => {
   const auth = useAuth()
   const authCheck = useAuthCheck()
   const db = useDatabase()
   const [isWorkout, setIsWorkout] = useState(false);

   // Constants, vars
   const workoutRef = db.ref(`users/${authCheck.userAuth.uid}/isWorkingOut`)

   // Lifecycle
   useEffect(() => {
      workoutRef.on('value', snapshot => {
         if (snapshot.exists()) {
            setIsWorkout(snapshot.val())
         } else {
            setIsWorkout(false)
         }
      })

      return () => workoutRef.off()
   }, []);

   return (
      <div className="Home_container">
         <PageHeader title="Home" />
         <div>More coming soon! Stay tuned.</div>
         <Link to="/workout">
            {
               isWorkout ? (
                  'Continue workout'
               ) : (
                  'Start a new workout'
               )
            }
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

import { useAuthCheck } from 'context/auth';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useDatabase } from 'reactfire';
import Navbar from '../../ui/Navbar/Navbar'

const UserNavbar = (props) => {
   const authCheck = useAuthCheck()
   const db = useDatabase()
   const workoutRef = db.ref(`users/${authCheck.userAuth.uid}/isWorkingOut`)
   const [isWorkout, setIsWorkout] = useState(false);

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
      <Navbar>
         <NavLink exact to="/" className="navbarBrand" activeClassName="activeNavLink">Verve</NavLink>
         
         <div>
            {
               isWorkout &&
               <NavLink to="/workout" activeClassName="activeNavLink">Workouts</NavLink>
            }
            <NavLink to="/history" activeClassName="activeNavLink">History</NavLink>
            <NavLink to="/data" activeClassName="activeNavLink">Data</NavLink>
         </div>
         
         <NavLink to="/user" activeClassName="activeNavLink">
            {authCheck.user?.username}
         </NavLink>
      </Navbar>
    );
}
 
export default UserNavbar;
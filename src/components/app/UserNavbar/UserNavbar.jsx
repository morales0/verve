import { SideNavbar } from 'components';
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
      <SideNavbar>
         <SideNavbar.Brand exact to="/" activeClassName="activeBrandLink">
            Verve
         </SideNavbar.Brand>
         
         <div className="navGroup_container">
            {
               isWorkout &&
               <SideNavbar.NavLink to="/workout" activeClassName="activeNavLink">
                  Workouts
               </SideNavbar.NavLink>
            }
            <SideNavbar.NavLink to="/history" activeClassName="activeNavLink">
               History
            </SideNavbar.NavLink>
            <SideNavbar.NavLink to="/data" activeClassName="activeNavLink">
               Data
            </SideNavbar.NavLink> 
            <SideNavbar.NavLink to="/builder" activeClassName="activeNavLink">
               Builder
            </SideNavbar.NavLink> 
            <SideNavbar.NavLink to="/calculator" activeClassName="activeNavLink">
               Calculator
            </SideNavbar.NavLink> 
            <SideNavbar.NavLink to="/about" activeClassName="activeNavLink">
               About
            </SideNavbar.NavLink> 
         </div>
         
         <SideNavbar.UserLink to="/user" activeClassName="activeNavLink">
            {authCheck.user?.username}
         </SideNavbar.UserLink>
      </SideNavbar>
    );
}
 
export default UserNavbar;
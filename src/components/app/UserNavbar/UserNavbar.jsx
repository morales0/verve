import { SideNavbar, AppNavLink, Brand, UserLink } from 'components';
import MobileNavbar from 'components/ui/Navbar/MobileNavbar';
import { useAuthCheck } from 'context/auth';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDatabase } from 'reactfire';
import Navbar from '../../ui/Navbar/Navbar'

// Icons
import DumbellIcon from 'images/dumbell.png'
import CalendarIcon from 'images/calendar.png'
import GraphIcon from 'images/graph.png'
import WrenchIcon from 'images/wrench.png'
import CalculatorIcon from 'images/calc.png'
import InfoIcon from 'images/info.png'
import UserIcon from 'images/user.png'

const DynamicNav = ({ children, isMobile }) => {
   if (false) {
      return (
         <MobileNavbar>
            {children}
         </MobileNavbar>
      )
   } else {
      return (
         <SideNavbar>
            {children}
         </SideNavbar>
      )
   }
}

const UserNavbar = (props) => {
   // State, hooks
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
      <DynamicNav isMobile={props.isMobile}>
         <Brand exact to="/">
            Verve
         </Brand>
         
         <div className="navGroup_container">
            {
               isWorkout &&
               <AppNavLink 
                  to="/workout"
                  icon={DumbellIcon}
                  title='Workout'
                  collapsed={true}
               />
            }
            <AppNavLink
               to="/history" 
               activeClassName="activeNavLink" 
               icon={CalendarIcon}
               title='History'
               collapsed={true}
            />
            <AppNavLink
               to="/data" 
               activeClassName="activeNavLink" 
               icon={GraphIcon}
               title='Exercise Data'
               collapsed={true}
            />
            <AppNavLink
               to="/builder" 
               activeClassName="activeNavLink" 
               icon={WrenchIcon}
               title='Exercise Builder'
               collapsed={true}
            />
            <AppNavLink
               to="/calculator" 
               activeClassName="activeNavLink" 
               icon={CalculatorIcon}
               title='Calculator'
               collapsed={true}
            />
            <AppNavLink
               to="/about" 
               activeClassName="activeNavLink" 
               icon={InfoIcon}
               title='About'
               collapsed={true}
            />
         </div>
         
         <UserLink 
            to="/user"
            activeClassName="activeNavLink"
            icon={UserIcon}
            username={authCheck.user?.username}
            collapsed={true}
         />
      </DynamicNav>
    );
}
 
export default UserNavbar;
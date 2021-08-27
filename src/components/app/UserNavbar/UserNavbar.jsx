import { SideNavbar } from 'components/ui';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar'
import { useAuthCheck } from 'context/auth';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDatabase } from 'reactfire';
import Navbar from '../../ui/Navbar/Navbar'


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

   // Render the appropriate navbar
   if (props.isMobile) {
      return <MobileNavbar username={authCheck.user?.username} isWorkout={isWorkout} />
   } else {
      return <DesktopNavbar username={authCheck.user?.username} isWorkout={isWorkout} />
   }
}
 
export default UserNavbar;
import { SideNavbar } from 'components/ui';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar'
import { useAuthCheck } from 'context/auth';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDatabase, useUser } from 'reactfire';
import Navbar from '../../ui/Navbar/Navbar'


const UserNavbar = (props) => {
   // State, hooks
   const user = useUser()
   const db = useDatabase()
   const [isWorkout, setIsWorkout] = useState(false);

   // Constants, vars
   const workoutRef = db.ref(`users/${user.data.uid}/isWorkingOut`)

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
      return <MobileNavbar username={user.data.email} isWorkout={isWorkout} />
   } else {
      return <DesktopNavbar username={user.data.email} isWorkout={isWorkout} />
   }
}
 
export default UserNavbar;
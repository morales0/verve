import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar'
import { useUser } from 'reactfire';
import { useWorkingOutCheck } from "services/firebase/index"
import { useEffect } from 'react';

const UserNavbar = ({ isMobile }) => {
   // State, hooks
   const user = useUser()
   const isWorkingOut = useWorkingOutCheck()

   useEffect(() => {
      console.log(user)
   });

   // Render the appropriate navbar
   if (isMobile) {
      return <MobileNavbar username={user.data.email} isWorkout={isWorkingOut} />
   } else {
      return <DesktopNavbar username={user.data.email} isWorkout={isWorkingOut} />
   }
}
 
export default UserNavbar;
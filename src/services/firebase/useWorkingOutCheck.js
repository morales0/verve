import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";

/* Subscribes to changes to the boolean 'isWorkingOut' */
const useWorkingOutCheck = () => {
   const user = useUser()
   const db = useDatabase()
   const [isWorkingOut, setIsWorkingOut] = useState(false);
   
   // Lifecycle
   useEffect(() => {
      if (user.data){
         const workoutRef = ref(db, `users/${user.data.uid}/isWorkingOut`)
         const workoutListener = onValue(workoutRef, snapshot => {
            if (snapshot.exists()) {
               setIsWorkingOut(snapshot.val())
            } else {
               setIsWorkingOut(false)
            }
         })

         // This is the unsubscribe function provided by firebase
         return () => workoutListener()
      }
      
   }, [user.data, db]);

   return isWorkingOut
}

export default useWorkingOutCheck
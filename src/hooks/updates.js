import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";
import { onValue, query, ref, set, get, remove, orderByKey, limitToFirst, limitToLast } from "firebase/database";
import VERSION from "util/version";

const useUpdates = () => {
   const db = useDatabase()
   const user = useUser()

   const versionRef = ref(db, `users/${user.data.uid}/version`)
   
   const updateUserData = () => {
      // If user has old custom-exercises, change to new data
      get(ref(db, `users/${user.data.uid}/custom-exercises`)).then(snapshot => {
         if (snapshot.exists()) {
            let oldData = snapshot.val()
            set(ref(db, `users/${user.data.uid}/customExercises`), oldData)
            remove(ref(db, `users/${user.data.uid}/custom-exercises`))
         }
      })

      // Restart history
      remove(ref(db, `users/${user.data.uid}/history`))

      set(versionRef, VERSION)
   } 

   useEffect(() => {
      const versionListener = onValue(versionRef, snapshot => {
         // If no version number exists, set to current version
         if (!snapshot.exists()) {
            updateUserData()
            set(versionRef, VERSION)
            return
         }

         let version = snapshot.val()

         if (version !== VERSION) {
            // Update user data to newest version
            updateUserData()
         }
      }, {
         onlyOnce: true
      })

      return () => versionListener()
   }, []);
}

export default useUpdates
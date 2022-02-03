import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDatabase, useUser } from 'reactfire';


const useDataPage = (date, time) => {
   const db = useDatabase()
   const user = useUser()
   const [workoutData, setWorkoutData] = useState({status: 'loading', data: {}});
   
   useEffect(() => {
      const workoutRef = ref(db, `users/${user.data.uid}/history/${date}/${time}`)
      onValue(workoutRef, snapshot => {
         if (!snapshot.exists()){
            setWorkoutData({status: 'error', data: {}})
            return
         }

         let data = snapshot.val()
         setWorkoutData({status: 'success', data: data})
      })
   }, []);

   return workoutData
}

export default useDataPage
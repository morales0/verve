import { useState } from "react";


const useHistory = () => {
   const [status, setStatus] = useState('loading');
   const [workoutHistory, setWorkoutHistory] = useState(null);

   // Get history once

   // Create api for history data
   const api = {
      removeWorkout: () => {}
   }

   return { status, workoutHistory, api }
}

export {
   useHistory
}
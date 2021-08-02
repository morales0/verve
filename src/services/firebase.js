import firebase from "firebase"

const db = firebase.database()

const subscribeToWorkout = (callback) => {
   const workout = db.ref('user/workout')

   workout.on('value', snapshot => callback(snapshot))


}
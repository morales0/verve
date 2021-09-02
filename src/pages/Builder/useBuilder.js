const { useState, useEffect } = require("react")

const useBuilder = (initName) => {
   const [status, setStatus] = useState('loading');
   const [name, setName] = useState('');
   const [measures, setMeasures] = useState([]);
   const [muscles, setMuscles] = useState([]);

   // If name is supplied, search for current data on this exercise
   useEffect(() => {
      if (initName) {
         console.log('Search for', initName)
      }
   }, [initName]);

   const data = {
      name: name,
      measures: measures,
      muscles: muscles
   }

   const api = {
      setName: setName,
      setMeasures: setMeasures,
      setMuscles: setMuscles
   }

   return { status, data, api }
}

// Firebase custom exercise functions
const addCustomExercise = (name, data) => {

}

const removeCustomExercise = (name) => {

}

const updateCustomExercise = (name, newData) => {
   
}


export default useBuilder
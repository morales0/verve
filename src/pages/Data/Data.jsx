import { PageHeader } from "components";
import { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { VictoryChart, VictoryLine } from "victory";
import { DataPageHeader, ExerciseBar, DataContainer } from "./components/styled-components";

import './Data.scss'
import exerciseData from "./test-data";

const exercises = [
   {
      name: 'Pushups',
      data: exerciseData
   },
   {
      name: 'Pullups',
      data: [
         { x: 1, y: 2 },
         { x: 2, y: 3 },
         { x: 3, y: 5 },
         { x: 4, y: 4 },
         { x: 5, y: 7 }
      ]
   },
   {
      name: 'Bench Press',
      data: [
         { x: 1, y: 2 },
         { x: 2, y: 3 },
         { x: 3, y: 5 },
         { x: 4, y: 4 },
         { x: 5, y: 7 }
      ]
   },
   {
      name: 'Squats',
      data: [
         { x: 1, y: 2 },
         { x: 2, y: 3 },
         { x: 3, y: 5 },
         { x: 4, y: 4 },
         { x: 5, y: 7 }
      ]
   },
]

const Data = (props) => {
   const [currentExercise, setCurrentExercise] = useState(null);

   return (
      <div className='Data_page'>
         <DataPageHeader
            title='Exercise Data'
         />

         <ExerciseBar exercises={exercises} setExercise={setCurrentExercise} />

         <DataContainer>
            {
               currentExercise ? (
                  
                     <LineChart
                        data={currentExercise.data}
                        height={300}
                        width={500}
                     >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis 
                           dataKey='x'
                           type='number'
                           ticks={[1, 5, 10, 15, 20]}
                           domain={['dataMin', 'dataMax']}
                        />
                        <YAxis 
                           dataKey='y'
                           domain={['auto', 'auto']}
                        />
                        <Tooltip />
                        <Line type="monotone" dataKey='y' stroke="#8884d8" activeDot={{ r: 8 }} />
                     </LineChart>
               ) : (
                  <div>
                     Choose an exercise from the exercise bar to view data for
                  </div>
               )
            }
         </DataContainer>
      </div>

   );
}

export default Data;
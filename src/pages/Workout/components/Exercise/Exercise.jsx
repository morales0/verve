import React, {useState} from 'react'
import { Flex } from '../../../../layout/'

import styled from 'styled-components/macro'
import CompleteIcon from '../../../../images/check.png'
import DeleteIcon from '../../../../images/cancel.png'

import './Exercise.scss'
import Set from '../Set/Set'
import { SetMeasureLabel } from './styled-components'
import { useWorkout } from 'pages/Workout/WorkoutContainer'

const Exercise = (props) => {
   // Destructure props
   // Connect to the exercise in firebase

   const { api } = useWorkout()



   return (
      <div className="Exercise">
         {/* Heading of the exercise box */}
         <Flex mainAxis="space-between" className="exercise_header">
            <h4 className="exerciseName">
               {props.name}
            </h4>
            <div className="exerciseControl_container">
					<button onClick={() => api.removeExercise(props.name)}>
                  <img src={DeleteIcon} height="10px"/>
               </button>
					<button onClick={() => api.completeExercise(props.name)} disabled={!props.sets}>
                  <img src={CompleteIcon} height="10px"/>
               </button>
				</div>
         </Flex>

         {/* Content of the exercise box */}
         <Flex crossAxis='stretch' className="exercise_content">
            {/* Buttons to add sets */}
            <Flex box column item stretch className="setControl_container">
               <button 
                  onClick={() => api.addSetToExercise(props.name, 
                     props.sets ? props.sets.length : 0, props.measures)}>
                  +
               </button>
               <button onClick={()=> api.removeSetFromExercise(props.name, props.sets.length - 1)} disabled={!props.sets}>
                  -
               </button>
            </Flex>

            {/* Set values */}
            <Flex box column className="sets_container">
               {!props.sets || props.sets.length === 0 ? (
                  <Flex item box mainAxis="center" crossAxis="center" grow="1">
                     &#8592; Add sets
                  </Flex>
               ) :
                  Object.values(props.measures).map((m, i) => {
                     return ( 
                        <Flex box column>
                           <Flex box row>
                              {Object.values(props.sets).map((set, j) => {
                                 return (
                                    <Set key={`${props.name}${m}${j}`} 
                                       value={set[m]} 
                                       onChange={(newVal) => api.updateSetInExercise(props.name, j, m, newVal)} 
                                       css={`
                                          margin-top: 20px;
                                          background: transparent;
                                       `}
                                    />
                                 )
                              })}
                           </Flex>
                           <SetMeasureLabel name={m} />
                        </Flex>
                     )
                  })
               }
            </Flex>
         </Flex>
      </div>
   )
}


export default Exercise

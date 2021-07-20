import SetDisplay from "../Set/SetDisplay";
import { Flex } from '../../../../layout/'

import styled from 'styled-components/macro'

import './Exercise.scss'
import { SetMeasureLabel } from './styled-components'
import UndoIcon from '../../../../images/undo.png'

const ExerciseDisplay = (props) => {
   return ( 
      <div className="Exercise">
         {/* Heading of the exercise box */}
         <Flex mainAxis="space-between" className="exercise_header">
            <h4 className="exerciseName">
               {props.name}
            </h4>
            <div className="exerciseControl_container">
					<button onClick={() => props.undoExercise(props.name)}>
                  <img src={UndoIcon} height="10px"/>
               </button>
				</div>
         </Flex>

         {/* Content of the exercise box */}
         <Flex crossAxis='stretch' className="exercise_content">
            {/* Set values */}
            <Flex box column className="sets_container">
               {Object.values(props.measures).map((m, i) => {
                     return ( 
                        <Flex box column>
                           <Flex box row>
                              {Object.values(props.sets).map((set, j) => {
                                 return (
                                    <SetDisplay key={`${props.name}${m}${j}`} 
                                       value={set[m]} 
                                       css={`
                                          margin-top: 20px;
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
    );
}
 
export default ExerciseDisplay;
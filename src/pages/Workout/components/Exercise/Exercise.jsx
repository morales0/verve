import React from 'react'
import { Flex } from '../../../../layout/'

import styled from 'styled-components/macro'
import CompleteIcon from '../../../../images/check.png'
import DeleteIcon from '../../../../images/cancel.png'

import './Exercise.css'
import Set from '../Set/Set'

const Exercise = (props) => {
   return (
      <div className="Exercise">
         {/* Heading of the exercise box */}
         <Flex mainAxis="space-between" css={`
            background-color: #dee3e6;
            border-bottom: 1px solid #adadad;
         `}>
            <h4 css={`padding: .25rem .75rem;`}>{props.name}</h4>
            <div css={`
               display: flex;

               &> button {
                  background: transparent;
                  box-shadow: none;
                  outline: none;
                  border-radius: 0px;
                  border: none;
                  border-left: 1px solid #a1a1a1;
                  width: 30px;
                  cursor: pointer;
               }
            `}>
					<button onClick={props.removeExercise}>
                  <img src={DeleteIcon} height="10px"/>
               </button>
					<button onClick={props.completeExercise}>
                  <img src={CompleteIcon} height="10px"/>
               </button>
				</div>
            
         </Flex>

         {/* Content of the exercise box */}
         <Flex crossAxis='stretch' css={`position: relative; width: 100%; max-width: 350px;`}>
            {/* Buttons to add sets */}
            <Flex box column item stretch css={`
               width: auto;

               &> button {
                  
                  flex-grow: 1;
                  width: 30px;
                  height: 25px;
                  
                  background: #fff;
                  box-shadow: none;
                  outline: none;
                  border: none;
                  border-radius: 0px;
                  border-right: 1px solid #a9a9a9;
                  cursor: pointer;
               }

               &> button + button {
                  border-top: 1px solid #a9a9a9;
               }

               
            `}>
               <button onClick={()=>props.addSet()}>
                  +
               </button>
               <button onClick={()=>props.removeSet()}>
                  -
               </button>
            </Flex>

            {/* Set values */}
            <Flex box column css={`
               flex-grow: 1;
               overflow-x: auto;
            `}>
               {!props.sets || props.sets.length === 0 ? (
                  <Flex item box mainAxis="center" crossAxis="center" grow="1">
                     Add sets &#8594;
                  </Flex>
               ) :
                  Object.values(props.measures).map((m, i) => {
                     return ( 
                        <Flex box column>
                           <Flex box row >
                              {Object.values(props.sets).map((set, j) => {
                                 return (
                                    <Set value={set[m]} css={`
                                       margin-top: 20px;
                                    `}/>
                                 )
                              })}
                           </Flex>
                           <div css={`
                              position: absolute;
                              display: flex;
                              align-items: center;
                              padding: 0 5px;
                              width: 100%;
                              height: 20px;
                              font-size: 12px;
                              background: #f1f1f1;
                           `}>
                              {m}
                           </div>
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

import React from 'react'
import { Flex } from '../../../layout'

import styled from 'styled-components/macro'

import './Exercise.css'
import Set from '../../../pages/Workout/components/Set/Set'

const Exercise = (props) => {
   return (
      <div className="Exercise">
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
					<button onClick={props.removeExercise}>-</button>
					<button onClick={props.completeExercise}>+</button>
				</div>
            
         </Flex>

         {/* Content of the exercise box */}
         <Flex crossAxis='stretch' css={`width: 100%; max-width: 350px;`}>
            {/* Set values */}
            <Flex css={`
               overflow-x: auto;

               & > div + div {
                  border-left: 1px solid #ccc;
               }
            `}>
               {!props.sets || props.sets.length === 0 ? (
                  <div>
                     Add sets to the right
                  </div>
               ) :
                  Object.values(props.sets).map(((set, setInd) => {
                     return (
                        <Flex box column item grow="1" key={`Flex${setInd}`}>
                           {Object.entries(set).map(([m, val], i) => {
                              return (
                             
                              <Set key={props.name+setInd+i} defaultValue={val} 
                                 type={m}
                                 css={`
                                    flex-grow: 1;
                                    min-width: 50px;
                                 `}
                              />)
                           })}
                        </Flex>
                     )
                     
                  }))
               }
            </Flex>
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
                  border-left: 1px solid #a9a9a9;
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
         </Flex>
      </div>
   )
}


export default Exercise

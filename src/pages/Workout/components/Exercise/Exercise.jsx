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
         <Flex crossAxis='stretch' css={`width: 100%; max-width: 350px;`}>
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
            <Flex css={`
               flex-grow: 1;
               overflow-x: auto;

               & > div + div {
                  border-left: 1px solid #ccc;
               }
            `}>
               {!props.sets || props.sets.length === 0 ? (
                  <Flex item box mainAxis="center" crossAxis="center" grow="1">
                     Add sets &#8594;
                  </Flex>
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
                                    min-width: 32px;
                                 `}
                              />)
                           })}
                        </Flex>
                     )
                     
                  }))
               }
            </Flex>

            
         </Flex>
      </div>
   )
}


export default Exercise

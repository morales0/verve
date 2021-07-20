import React, { useState } from 'react'

import styled from 'styled-components/macro'
import { Flex } from '../../../../layout'
import { StyledSetInput, IncBtn } from './components';

import './Set.scss';

const Set = (props) => {
   const [prev, setPrev] = useState(0);

   // Set hook?
   const [set, setSet] = useState();

   // Functions
   const validateNum = (newVal) => {
      if (newVal === '' || newVal < 0) {
         updateSetValue(prev)
      } else {
         updateSetValue(newVal)
      }
   }

   const onFocus = () => {
      // Save prev value
      setPrev(props.value)
      // Clear the input
      updateSetValue('')
   }

   const onBlur = (newVal) => {
      if (newVal !== '') {
         validateNum(newVal)
         setPrev(newVal)
      } else {
         updateSetValue(prev)
      }
   }

   const updateSetValue = (newVal) => {
      props.onChange(newVal)
   }

   return (
      <Flex row mainAxis='center' className='Set_container'>
         <IncBtn onClick={() => validateNum(parseInt(props.value) - 1)} className='incBtn'>
            -
         </IncBtn>
         <StyledSetInput 
            value={props.value} 
            onChange={(e) => updateSetValue(e.target.value)} 
            onFocus={onFocus}
            onBlur={(e) => onBlur(e.target.value)}
         />
         <IncBtn onClick={() => validateNum(parseInt(props.value) + 1)} className='incBtn'>
            +
         </IncBtn>
      </Flex>
      
   )
}

export default Set
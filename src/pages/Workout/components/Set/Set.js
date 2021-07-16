import React, { useState } from 'react'

import styled from 'styled-components/macro'
import { Flex } from '../../../../layout'
import { StyledSetInput, IncBtn } from './components';

import './Set.scss';

const Set = (props) => {
   const [val, setVal] = useState(0);
   const [prev, setPrev] = useState(0);

   // Set hook?
   const [, set] = useState();

   // Functions
   const validateNum = (newVal) => {
      if (newVal === '' || newVal < 0) {
         setVal(prev)
      } else {
         setVal(newVal)
      }
   }

   const onFocus = () => {
      // Save prev value
      setPrev(val)
      // Clear the input
      setVal('')
   }

   const onBlur = (newVal) => {
      if (newVal !== '') {
         validateNum(newVal)
         setPrev(newVal)
      } else {
         setVal(prev)
      }
   }

   return (
      <Flex row mainAxis='center' className='Set_container'>
         <IncBtn onClick={() => validateNum(parseInt(val) - 1)} className='incBtn'>
            -
         </IncBtn>
         <StyledSetInput 
            value={val} 
            onChange={(e) => setVal(e.target.value)} 
            onFocus={onFocus}
            onBlur={(e) => onBlur(e.target.value)}
         />
         <IncBtn onClick={() => validateNum(parseInt(val) + 1)} className='incBtn' >
            +
         </IncBtn>
      </Flex>
      
   )
}

export default Set
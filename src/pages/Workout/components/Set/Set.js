import React, { useState } from 'react'

import styled from 'styled-components/macro'
import { Flex } from '../../../../layout'

import './Set.scss';

const Set = (props) => {
   const [val, setVal] = useState(0);

   return (
      <Flex row mainAxis='center' className='Set_container'>
         <IncBtn onClick={() => setVal(val - 1)} className='incBtn'>
            -
         </IncBtn>
         <StyledSetInput value={val} onChange={(e) => setVal(e.target.value)} />
         <IncBtn onClick={() => setVal(val + 1)} className='incBtn'>
            +
         </IncBtn>
      </Flex>
      
   )
}

const StyledSetInput = styled.input.attrs(props => ({
   type: "number",

}))`
   font-size: .85rem;
   width: 40px;
   padding: 8px 2px;
   text-align: center;
   border: none;
   border-radius: 0;

   
   &::-webkit-inner-spin-button,
   &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

   &:focus {
      outline: none;
      background: #f5f7f6;
   }

`

const IncBtn = styled.button`
   flex-grow: 1;
   padding: 6px;
   
   background: #fff;
   color: #797979;
   font-size: .55rem;
   box-shadow: none;
   outline: none;
   border: none;
   cursor: pointer;
`

export default Set

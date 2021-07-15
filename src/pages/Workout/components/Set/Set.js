import React, { useState } from 'react'

import styled from 'styled-components/macro'
import { Flex } from '../../../../layout'

const Set = (props) => {
   const [val, setVal] = useState(0);

   return (
      <Flex column crossAxis='center' className={props.className}>
         <Flex row mainAxis='center'>
            <IncBtn onClick={() => setVal(val - 1)}>
               -
            </IncBtn>
            <StyledSetInput css={`min-width: 32px;`} value={val} onChange={(e) => setVal(e.target.value)} />
            <IncBtn onClick={() => setVal(val + 1)} >
               +
            </IncBtn>
         </Flex>
         {/* <div>
            <button>+</button>
            <button>-</button>
         </div> */}
      </Flex>
   )
}

const StyledSetInput = styled.input.attrs(props => ({
   type: "number",

}))`
   font-size: .85rem;
   width: 100%;
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

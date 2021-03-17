import React from 'react'

import styled from 'styled-components/macro'
import { Flex } from '../../../../layout'

const Set = (props) => {
   return (
      <Flex column crossAxis='center'>
         <StyledSetInput {...props}>
            {props.children}
         </StyledSetInput>
         <label css={`
            font-size: .8rem;
            line-height: .8rem;
            padding: 4px 0;
         `}>
            {props.type}
         </label>
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
   padding: 8px 6px;
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

export default Set

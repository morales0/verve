import React from 'react'

import styled from 'styled-components/macro'
import { Flex } from '../../../../layout'

const Set = (props) => {
   return (
      <Flex column crossAxis='center'>
         <Flex column>
            
            {/* Buttons to add sets */}
            <Flex box row item stretch css={`
               width: auto;

               &> button {
                  color: #5a5a5a;
                  
                  flex-grow: 1;
                  width: 20px;
                  height: 20px;
                  
                  background: #fff;
                  box-shadow: none;
                  outline: none;
                  border: none;
                  border-radius: 0px;
                  border-bottom: 1px solid #a9a9a9;
                  cursor: pointer;
               }

               &> button + button {
                  border-left: 1px solid #a9a9a9;
               }

               
            `}>
               <button>
                  -
               </button>
               <button>
                  +
               </button>
            </Flex>

            <StyledSetInput {...props}>
               {props.children}
            </StyledSetInput>
         </Flex>
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
   padding: 8px 2px;
   text-align: center;
   border: none;
   border-bottom: 1px solid #a9a9a9;
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

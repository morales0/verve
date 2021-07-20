import React, { useState } from 'react'

import styled from 'styled-components/macro'
import { Flex } from '../../../../layout'
import { StyledSetInput, IncBtn } from './components';

import './Set.scss';

const SetDisplay = (props) => {
   return (
      <Flex row mainAxis='center' className='Set_container'>
         <StyledSetInput 
            value={props.value} 
            disabled
         />
      </Flex>
      
   )
}

export default SetDisplay
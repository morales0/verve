import styled from "styled-components";

const CompletedExercisesContainer = styled.div`
   
`

const Header = styled.header`
   display: flex;
   justify-content: space-between;
`

const FinishBtn = styled.button`
   padding: .5rem .6rem;
   border: 1px solid #59b751;
   box-shadow: 0 0 3px 1px rgba(0,0,0,15%);

   background-color: ${props => props.theme.bg};
   color: ${props => props.theme.fg};
`

export {
   CompletedExercisesContainer,
   Header,
   FinishBtn
}
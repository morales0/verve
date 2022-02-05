import styled from "styled-components";

const StyledWorkoutView = styled.div`
   position: relative;

   & > div:nth-of-type(2) {
      margin-top: 50px;
   }
`

const Body = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
   padding: .5rem;
   overflow-y: auto;
`

export {
   StyledWorkoutView,
   Body
}
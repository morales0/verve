import styled from "styled-components";

const StyledSetMeasureLabel = styled.div`
   // z-index: -1;
   position: absolute;
   display: flex;
   align-items: center;
   padding: 0 5px;
   width: 100%;
   height: 20px;
   font-size: 12px;
   background: #f1f1f1;
`

const SetMeasureLabel = ({name}) => {
   return (
      <StyledSetMeasureLabel>
         {name}
      </StyledSetMeasureLabel>
   )
}

export {
   SetMeasureLabel
}
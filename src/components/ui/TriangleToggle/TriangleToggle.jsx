import styled from "styled-components"

const TriangleToggleBtn = styled.button`
   background: transparent;
   border: 1px solid gray;
   border-radius: 3px;
   width: 23px;
   height: 23px;
   display: grid;
   place-items: center;
   cursor: pointer;

   & > div {
      width: 0; 
      height: 0; 
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      
      border-top: 7px solid #333;
   
      transform: rotate(${props => props.open ? '180deg' : '0'});
      transition: .3s;
   }
`

const TriangleToggle = ({ ...rest }) => {
   return (
      <TriangleToggleBtn {...rest}>
         <div />
      </TriangleToggleBtn>
   )
}

export default TriangleToggle
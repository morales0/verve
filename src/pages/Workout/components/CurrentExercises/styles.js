import { Button } from "components";
import styled from "styled-components";

const StyledCurrentExercises = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;

   ${props => props.addExerciseFlag && 'overflow-y: hidden'};
   ${props => props.addExerciseFlag && 'flex-shrink: 0'};
`

const Header = styled.header`
   display: flex;
   justify-content: space-between;
`

const AddExerciseBtn = styled(Button)`
	position: sticky;
	bottom: .5rem;
	display: flex;
	padding: .8rem;
	margin: .5rem;
	margin-left: auto;
	border: 1px dashed #999;
	box-shadow: 0 0 3px 1px rgba(0,0,0,15%);
	font-size: .8rem;

   background-color: ${props => props.theme.bg};
   color: ${props => props.theme.fg};
`
 
const CancelWorkoutBtn = styled.button`
   padding: .5rem .6rem;
   border: 1px solid #c75757;
	box-shadow: 0 0 3px 1px rgba(0,0,0,15%);

   background-color: ${props => props.theme.bg};
   color: ${props => props.theme.fg};

   cursor: pointer;
`

export {
   StyledCurrentExercises,
   Header,
   AddExerciseBtn,
   CancelWorkoutBtn
}
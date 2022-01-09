import { Button } from "components";
import styled from "styled-components";

const CurrentExercisesContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
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
	background: #f9f9f9;
	border: 1px dashed #999;
	box-shadow: 0 0 3px 1px rgba(0,0,0,15%);
	color: #555;
	font-size: .8rem;
`
 
const CancelWorkoutBtn = styled.button`
   padding: .5rem .6rem;
   border: 1px solid #c75757;
   background-color: #f9f9f9;

   cursor: pointer;
`

export {
   CurrentExercisesContainer,
   Header,
   AddExerciseBtn,
   CancelWorkoutBtn
}
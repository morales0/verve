import styled from "styled-components";

const StyledCurrentExerciseScreen = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   padding: 1rem;
   overflow-y: hidden;

   & button, input {
      box-shadow: 0px 0px 8px 3px rgb(0 0 0 / 20%);
      -webkit-appearance: none;
   }

   & input {
      border-color: #b8acff;
   }
`
const Header = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-bottom: 0.6rem;
   border-bottom: 1px solid #555;
`

const Body = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   overflow-y: hidden;
`

const SetGrid = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   overflow-y: auto;
   padding-right: 1rem;
`

const SetRow = styled.div`
   display: flex;
   gap: 1rem;
   margin-bottom: 1rem;
`

const SetValInput = styled.input`
   height: 80px;
   width: 80px;
   background-color: ${({theme}) => theme.name === 'dark' ? '#3b3942' : 'white'};
   color: ${({theme}) => theme.fg};
   font-size: 1.2rem;
   text-align: center;
   border: 1px solid #999;
   border-radius: 1px;

   box-shadow: 0px 0px 9px 3px rgb(0 0 0 / 20%);
   -webkit-appearance: none;

   &::-webkit-outer-spin-button,
   &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
`

const WeightChoiceContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 80px;
   width: 80px;
   background-color: transparent;
   color: ${({theme}) => theme.fg};
   font-size: 1.2rem;
   border: 1px solid #999;
   border-radius: 1px;

   & > .value {
      flex-basis: 20px;
      flex-grow: 0;
      font-size: .9rem;
      border-bottom: 1px solid #aaa;
      text-align: center;
   }

   & > .choices {
      display: grid;
      flex-grow: 1;
      place-items: center;
   }
`

const LabelContainer = styled.div`
   display: flex;
   gap: 1rem;
   padding: .6rem 0;
`

const MeasureLabel = styled.h4`
   width: 80px;
   text-align: center;
`

const AddSetButton = styled.button`
   width: ${({setSize}) => `calc((${setSize} * 80px) + (1rem * ${setSize}) - 1rem)`};
   border: 1px solid #4d9478;
   background: transparent;
   margin-bottom: 1rem;
   color: #b1b1b1;
   text-align: center;
   font-size: 1.5rem;
   cursor: pointer;

   &:hover {
      background-color: ${({theme}) => 
         theme.name === 'light' ? '#dadada' : '#545454'
      };
   }
`

const RemoveSetButton = styled.button`
   height: 100%;
   border: 1px solid #875a5a;
   background: transparent;
   margin: 0;
   padding: 0 7px;
   color: #b1b1b1;
   text-align: center;
   font-size: 1.2rem;
   cursor: pointer;

   &:hover {
      background-color: ${({theme}) => 
         theme.name === 'light' ? '#dadada' : '#545454'
      };
   }
`

const ControlGroup = styled.div`
   display: flex;
   justify-content: space-between;
   padding-top: 0.5rem;
   border-top: 1px solid #555;

`

export {
   StyledCurrentExerciseScreen,
   Header,
   Body,
   SetGrid,
   SetRow,
   SetValInput,
   WeightChoiceContainer,
   LabelContainer,
   MeasureLabel,
   AddSetButton,
   RemoveSetButton, 
   ControlGroup
}
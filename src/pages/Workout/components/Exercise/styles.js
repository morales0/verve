import styled from "styled-components";

const ExerciseStyle = styled.div`
   max-width: 400px;
   min-width: 200px;
   border: 1px solid #adadad;
`

const Header = styled.header`
   display: flex;
   justify-content: space-between;
   background-color: #dee3e6;
   border-bottom: 1px solid #adadad;

   & > h4 {
      padding: .2rem .5rem;
   }
`

const Body = styled.div`

`

const SetListContainer = styled.div`

`

const SetControlBtn = styled.button`
   padding: .5rem;
   margin: 3px;
   min-width: 46px;
   min-height: 46px;
   background-color: #dee3e6;
   border: 1px solid #cecece;

   cursor: pointer;

   &:hover {
      background-color: #b4bfc5
   }

   &:focus {

   }
`

const ExerciseControlBtn = styled.button`
   padding: .5rem;
   height: 100%;
   width: 40px;
   background-color: transparent;
   border: none;
   border-left: 1px solid #adadad;
   border-radius: 0;
   cursor: pointer;

   &:hover {

   }

   &:focus {

   }
`

export {
   ExerciseStyle,
   Header,
   SetControlBtn,
   ExerciseControlBtn
}
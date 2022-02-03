import styled from 'styled-components'

const StyledExerciseView = styled.div`
   border: 1px solid #d1d1d1;
   max-width: 100%;
`

const Header = styled.h4`
   display: flex;
   justify-content: space-between;
   padding: .2rem .5rem;
   font-size: 1.2rem;
   background-color: #dee3e6;
   color: #333;
   border-bottom: 1px solid #adadad;
`

const Body = styled.div`
   display: flex;

   /* border-bottom: 1px solid white;
   border-left: 1px solid white;
   border-right: 1px solid white; */
`


const SetGrid = styled.div`
   display: grid;
   grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
   grid-auto-flow: column;
   overflow-x: auto;

   /* Calculate all the cells that are not left most */
   /* & > div:not(:nth-child(${({ cols }) => `${cols}n - ${cols - 1}`})) {
      border-left: 1px solid #bbb;
   } */

   & > div:nth-child(n + ${({ rows }) => rows + 1}) {
      border-left: 1px solid #bbb;
   }
`

const Val = styled.div`
   padding: 1rem;
`

const Labels = styled.div`
   border-left: 1px solid #eee;
`

const Label = styled.div`
   padding: 1rem .4rem;
`

export {
   StyledExerciseView,
   Header,
   Body,
   SetGrid,
   Val,
   Labels,
   Label,
}
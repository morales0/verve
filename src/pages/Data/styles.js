import styled from 'styled-components'

const StyledData = styled.div`
   display: flex;
   flex-direction: column;
`

const Header = styled.header`
   padding: .6rem;
`
const Body = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   gap: 1rem;
   padding: .6rem;
   overflow-y: auto;
`

export {
   StyledData,
   Header,
   Body
}
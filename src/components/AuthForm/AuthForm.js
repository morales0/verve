import styled from 'styled-components'

const AuthForm = (props) => {
   return ( 
      <StyledAuthForm>
         {props.children}
      </StyledAuthForm>
    );
}

const StyledAuthForm = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 250px;
   margin: auto;
`
 
export default AuthForm;
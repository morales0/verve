import styled from "styled-components"

const AuthFormStyle = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 250px;
   margin: auto;
   width: 400px;
   max-width: 85%;
   background: white;
   border: 1px solid #adadad;
   border-radius: 3px;
   overflow: hidden;

   & > header {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      background-color: #dee3e6;
      border-bottom: 1px solid #adadad;

      > h3 {
         padding: .3rem;
      }

      > button {
         padding: .3rem;
         background: transparent;
         border: none;
         cursor: pointer;
         border-left: 1px solid #999999;
         border-radius: 0;
      }
   }

   & > .content {
      padding: .4rem;
   }
`

const AuthForm = ({ headerName, submitName, children, onSubmit }) => {

   const handleSubmit = (e) => {
      e.preventDefault()

      onSubmit()
   }

   return (
      <AuthFormStyle onSubmit={handleSubmit}>
         <header>
            <h3>{headerName}</h3>
            <button>{submitName}</button>
         </header>
         <div className="content">
            {children}
         </div>
      </AuthFormStyle>
   )
}

export default AuthForm

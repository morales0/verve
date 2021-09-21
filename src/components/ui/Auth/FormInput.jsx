import styled from "styled-components";

const FormInput = styled.div`
   margin-bottom: .5rem;

   & > label {
      display: inline-block;
      margin-bottom: 4px;
   }

   & > input {
      display: block;
      padding: .4rem;
      width: 100%;
      font-size: .9rem;
   }
`

export default FormInput
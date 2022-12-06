import styled from "styled-components";

const FormInput = styled.div`
  margin-bottom: 0.5rem;

  & > label {
    display: inline-block;
    margin-bottom: 4px;
  }

  & > input {
    display: block;
    padding: 0.4rem;
    width: 100%;
    font-size: 0.9rem;
  }
`;

export default FormInput;

import styled from "styled-components";

const StyledSetInput = styled.input.attrs((props) => ({
  type: "number",
}))`
  font-size: 1rem;
  width: 44px;
  padding: 8px 2px;
  text-align: center;
  border: none;
  border-radius: 0;
  color: #43434a;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
    background: #f5f7f6;
  }
`;

const IncBtn = styled.button`
  flex-grow: 1;
  width: 24px;

  background: #fff;
  color: #797979;
  font-size: 0.8rem;
  box-shadow: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

export { StyledSetInput, IncBtn };

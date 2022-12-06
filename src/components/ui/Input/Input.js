import styled from "styled-components";

const TextInput = styled.input.attrs({
  type: "text",
})`
  width: 100%;
  font-size: 1rem;

  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
  border: 1px solid
    ${(props) => (props.theme.name === "light" ? "#999" : "#bbb")};
`;

export { TextInput };

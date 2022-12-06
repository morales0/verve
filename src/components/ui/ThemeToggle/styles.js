import styled from "styled-components";

const ThemeToggleWrapper = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 5px 2px;

  & input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    // pointer-events: none;

    &:checked + span {
      background: #444;

      &::before {
        background: white;
        right: 5px;
        left: initial;
      }
    }

    &:focus + span {
      // outline: #585858 auto 1px;
      border-color: #333;
    }
  }

  & span {
    display: flex;
    width: 60px;
    height: 30px;
    border: 2px solid #adadad;
    border-radius: 99em;
    position: relative;
    transition: transform 0.75s ease-in-out;
    transform-origin: 50% 50%;
    cursor: pointer;
    transition: 0.5s background-color;

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 5px;
      width: 20px;
      height: 20px;
      background: #222;
      border-radius: 50%;
    }
  }
`;

export { ThemeToggleWrapper };

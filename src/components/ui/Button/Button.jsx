import styled, { css } from "styled-components";

const sizebtnStyles = {
   small: css`
      padding: .5rem;
      margin: .5rem;
      font-size: .8rem;
   `,

   medium: css`
      padding: .8rem;
      margin: .7rem;
      font-size: .9rem;
   `,

   large: css`
      padding: 1rem;
      margin: .8rem;
      font-size: 1.2rem;
   `
}

const colorTemplate = ({ btnStyle = 'base', theme: { buttons } }) => css`
   color: ${buttons[btnStyle].color};
   background-color: ${buttons[btnStyle].bgColor};
   border: 1px solid ${buttons[btnStyle].borderColor};

   &:hover {
      background-color: ${buttons[btnStyle].bgColorHover};
      border-color: ${buttons[btnStyle].borderColorHover};
   }

   &:focus {
      background-color: ${buttons[btnStyle].bgColorFocus};
      border-color: ${buttons[btnStyle].borderColorFocus};
   }

   &:disabled {

   }
`

const Button = styled.button`
   ${({size}) => sizebtnStyles[size ? size : 'medium']};
   ${colorTemplate};

   border-radius: 2px;
   font-weight: 400;
   cursor: pointer;

   transition: background-color 150ms, border-color 150ms, color 150ms;
`
 
export default Button;
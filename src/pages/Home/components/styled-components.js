import { Link } from "react-router-dom";
import styled from "styled-components";

const WorkoutLink = styled(Link)`
   display: inline-block;
   padding: .3rem .7rem;
   border-radius: 3px;
   color: #333;
   border: 1px solid;
   border-color: ${props => props.theme.name === 'light' ? '#999' : 'transparent'};
   text-decoration: none;
   background: #dee3e6;
`

export {
   WorkoutLink
}
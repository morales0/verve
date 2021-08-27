import { Navbar } from "../Navbar/Navbar";
import styled from "styled-components";

const StyledSideNavbar = styled(Navbar)`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: flex-start;
   height: 100%;
   width: auto;
   background: #f1f1f1;
   color: #333;
   box-shadow: 0 0 3px 1px rgba(0,0,0, 0.15);
`

const SideNavbar = ({ children }) => {
   return (
      <StyledSideNavbar>
         {children}
      </StyledSideNavbar>
   )
}

export default SideNavbar
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MobileNavbar = (props) => {
   const [open, setOpen] = useState(false);

   return (
      <StyledNav>
         <div className="navMain">
            <div>
               Verve
            </div>
            <Hamburger onClick={() => setOpen(!open)} />
         </div>
         {
            open &&
            <div className="navLinks-collapse">
               <NavLink to="/history" activeClassName="activeNavLink">
                  History
               </NavLink>
               <NavLink to="/data" activeClassName="activeNavLink">
                  Data
               </NavLink>
               <NavLink to="/builder" activeClassName="activeNavLink">
                  Builder
               </NavLink>
               <NavLink to="/calculator" activeClassName="activeNavLink">
                  Calculator
               </NavLink>
               <NavLink to="/about" activeClassName="activeNavLink">
                  About
               </NavLink>
            </div>
         }
      </StyledNav>
   );
}

const StyledNav = styled.nav`
   z-index: 99;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   width: 100%;
   // height: 2rem;
   // background: linear-gradient(10deg, #daecf7, #e0e0e0);
   background: #505050;
   color: white;
   box-shadow: 0 0 3px 0px rgba(0,0,0, 0.15);

   & > .navMain {
      display: flex;
      justify-content: space-between;
      padding: .4rem .7rem; 
      width: 100%;
   }

   & > .navLinks-collapse {
      padding: .7rem .5rem;
   }

   // Nav links inside nav
   & a {
      display: flex;
      align-items: center;
      padding: .2rem .4rem;
      color: inherit;
      text-decoration: none;
      transition: .2s;
   }

   & a:hover {
      background-color: #6b80a2;
   }

   // When user is on the page for this link
`

const Hamburger = (props) => (
   <StyledHamburgerContainer onClick={props.onClick}>
      <div />
      <div />
      <div />
   </StyledHamburgerContainer>
)

const StyledHamburgerContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 17px;
   width: 20px;

   & > div {
      width: 100%;
      height: 2px;
      background: white;
   }
`

export default MobileNavbar;
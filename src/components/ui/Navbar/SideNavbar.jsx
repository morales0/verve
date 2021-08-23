import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import ArrowsIcon from 'images/triple-right-arrows.png'

// Navbar context
const NavbarContext = createContext({})

// Navbar link components

const StyledAppNavLink = styled(NavLink)`
   display: flex;
   align-items: center;
   padding: .5rem 1rem;
   width: 100%;
   color: inherit;
   text-decoration: none;
   border-left: 2px solid transparent;
   transition: .2s;

   &:hover {
      background-color: #6b80a2;
   }

   & > .navLinkTitle_text {
      margin-left: 10px;
   }
`

const AppNavLink = ({ icon, title, ...rest }) => {
   const { collapsed } = useContext(NavbarContext)

   return (
      <StyledAppNavLink {...rest}>
         <img src={icon} height='20' />
         {!collapsed && <div className='navLinkTitle_text'>{title}</div>}
      </StyledAppNavLink>
   )
}

const StyledBrand = styled(StyledAppNavLink)`
   justify-content: center;
   font-size: 1.2rem;
   border: none;
`

const NavHeader = styled.div`
   display: flex;
   justify-content: center;

   width: 100%;

   border-bottom: 1px solid #4c4c4c;
`

const StyledNavToggle = styled.button`
   padding: .5rem;
   border: none;
   background: transparent;
   cursor: pointer;

   transform: rotate(${props => props.collapsed ? '0' : '180deg'});

`

const NavToggle = ({icon, collapsed, onClick}) => {
   return (
      <StyledNavToggle collapsed={collapsed} onClick={onClick} >
         <img src={icon} height='20px' />
      </StyledNavToggle>
   )
}

const Brand = ({children, ...rest}) => {
   const { collapsed, setCollapsed } = useContext(NavbarContext)

   return (
      <NavHeader>
         <NavToggle 
            icon={ArrowsIcon}
            collapsed={collapsed}
            onClick={() => setCollapsed(!collapsed)}
         />
         {
            !collapsed && (
               <StyledBrand {...rest}>
                  {children}
               </StyledBrand>
            )
         }
      </NavHeader>
   )
}

const StyledUserLink = styled(StyledAppNavLink)`
   justify-content: center;
   background: #865c5c;
   border-left: 0;
   border-top: 1px solid #4c4c4c;
`

const UserLink = ({ icon, username, ...rest }) => {
   const { collapsed } = useContext(NavbarContext)

   return (
      <StyledUserLink {...rest}>
         <img src={icon} height='20' />
         {!collapsed && <div className='navLinkTitle_text'>{username}</div>}
      </StyledUserLink>
   )
}

// The navbar component
const StyledSideNav = styled.nav`
   z-index: 99;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: flex-start;
   width: auto;
   // height: 2rem;
   // background: linear-gradient(10deg, #daecf7, #e0e0e0);
   // background: #505050;
   background: #93909c;
   color: white;
   box-shadow: 0 0 3px 0px rgba(0,0,0, 0.15);

   & > .navGroup_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
   }

   // When user is on the page for this link
   .activeNavLink {
      border-left: 2px solid #b495ff!important;
   }

   .activeBrandLink {
      border-bottom: 2px solid #b495ff!important;
   }


   // Testing
   //width: 40px;
   //overflow-x: hidden;
`

const SideNavbar = (props) => {
   const [collapsed, setCollapsed] = useState(false);

   return (
      <NavbarContext.Provider value={{collapsed, setCollapsed}}>
         <StyledSideNav>
            {props.children}
         </StyledSideNav>
      </NavbarContext.Provider>
   )
}
 
export {
   SideNavbar,
   AppNavLink,
   Brand,
   UserLink
};
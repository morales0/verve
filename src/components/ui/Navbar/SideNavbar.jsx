import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSideNav = styled.nav`
   z-index: 99;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: flex-start;
   width: 100px;
   // height: 2rem;
   // background: linear-gradient(10deg, #daecf7, #e0e0e0);
   background: #505050;
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
`

const AppNavLink = styled(NavLink)`
   display: flex;
   align-items: center;
   padding: .2rem 10px;
   width: 100%;
   color: inherit;
   text-decoration: none;
   border-left: 2px solid transparent;
   transition: .2s;

   &:hover {
      background-color: #6b80a2;
   }
`

const Brand = styled(AppNavLink)`
   justify-content: center;
   font-size: 1.2rem;
   border-bottom: 1px solid #9a9a9a;
`

const UserLink = styled(AppNavLink)`
   justify-content: center;
`

const SideNavbar = (props) => {
   return (
      <StyledSideNav>
         {props.children}
      </StyledSideNav>
   )
}

// Additional exports
SideNavbar.NavLink = AppNavLink
SideNavbar.Brand = Brand
SideNavbar.UserLink = UserLink
 
export default SideNavbar;
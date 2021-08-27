import { TopNavbar, TopNavbarComponents as T } from "components/ui";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Navbar from '../../ui/Navbar/Navbar';

const GuestNavbar = (props) => {
   return ( 
      <TopNavbar>
         <T.BrandLink className='brand_link' exact to="/" activeClassName="activeNavLink">Verve</T.BrandLink>
         <NavGroup>
            <li>
               <NavLink to="/signIn" activeClassName="activeNavLink">Sign In</NavLink>
            </li>
            <li>
               <NavLink to="/signUp" activeClassName="activeNavLink">Sign Up</NavLink>
            </li>
         </NavGroup>
      </TopNavbar>
    );
}

const NavGroup = styled.ul`
   list-style: none;
   display: flex;
   align-items: center;
   justify-content: center;
`
 
export default GuestNavbar;
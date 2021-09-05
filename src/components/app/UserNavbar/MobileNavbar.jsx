import { useState } from "react";
import { TopNavbar, TopNavbarComponents as T } from "components/ui";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CollapseNav } from "components/ui/TopNavbar/components";
import { useNavbar } from "components/ui/Navbar/Navbar";
import userLinks from "./user-links";
import UserIcon from 'images/user.png'

const MobileNavbar = (props) => {
   return (
      <TopNavbar>
         <T.MainNav>
            <T.BrandLink className='brand_link' exact to="/" activeClassName="activeNavLink">Verve</T.BrandLink>
            <NavGroup>
               <T.UserLink to='/user'>
                  <img src={UserIcon} alt="desktop navbar toggle triangle" height='20' />
               </T.UserLink>
               <T.Hamburger />
            </NavGroup>
         </T.MainNav>

         <CollapseNav>
            {
               userLinks.filter(link => link.name !== 'Workout' || props.isWorkout).map((link, i) => {
                  return (
                     <li key={`${link.name}-${i}`}>
                        <T.AppNavLink
                           title={link.name}
                           to={link.to}
                           icon={link.icon}
                        />
                     </li>
                  )
               })
            }

         </CollapseNav>
      </TopNavbar>
   );
}

const NavGroup = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
`

export default MobileNavbar;
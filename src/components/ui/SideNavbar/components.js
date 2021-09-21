import { NavLink } from "react-router-dom"
import ArrowsIcon from 'images/triple-right-arrows.png'
import styled from "styled-components"
import { useNavbar } from "../Navbar/Navbar"
import { useUser } from "reactfire"

// Nav Links
const StyledAppNavLink = styled(NavLink)`
   display: flex;
   align-items: center;
   padding: .5rem 1rem;
   width: 100%;
   color: inherit;
   text-decoration: none;
   transition: .2s;

   &:hover {
      background-color: #6b80a2;
   }

   & > .navLinkTitle_text {
      margin-left: 10px;
   }
`

const AppNavLink = ({ icon, title, ...rest }) => {
   const { open } = useNavbar()
   
   return (
      <StyledAppNavLink {...rest}>
         <img src={icon} height='20' />
         {open && <div className='navLinkTitle_text'>{title}</div>}
      </StyledAppNavLink>
   )
}

// Header for the navbar
const NavHeader = styled.div`
   display: flex;
   justify-content: center;

   width: 100%;

   border-bottom: 1px solid #4c4c4c;
`

const StyledNavToggle = styled.button`
   display: grid;
   padding: .5rem;
   border: none;
   background: transparent;
   cursor: pointer;
   transform: rotate(${props => props.open ? '180deg' : '0'});
   transition: .3s;
`

const NavToggle = ({icon, open, onClick}) => {
   return (
      <StyledNavToggle open={open} onClick={onClick} >
         <img src={icon} height='20px' />
      </StyledNavToggle>
   )
}

// Brand link for the sidenavbar
const StyledBrand = styled(StyledAppNavLink)`
   justify-content: center;
   font-size: 1.2rem;
   border: none;
`

const BrandLink = ({children, ...rest}) => {
   const { open, setOpen } = useNavbar()

   return (
      <NavHeader>
         <NavToggle 
            icon={ArrowsIcon}
            open={open}
            onClick={() => setOpen(!open)}
         />
         {
            open && (
               <StyledBrand {...rest}>
                  {children}
               </StyledBrand>
            )
         }
      </NavHeader>
   )
}

// User link for side navbar
const StyledUserLink = styled(StyledAppNavLink)`
   justify-content: center;
   background: #865c5c;
   color: white;
   border-left: 0;
   border-top: 1px solid #4c4c4c;
`

const UserLink = ({ icon, username, ...rest }) => {
   const { open } = useNavbar() 
   const user = useUser()

   return (
      <StyledUserLink {...rest}>
         <img src={icon} height='20' />
         {open && <div className='navLinkTitle_text'>{user.data.displayName}</div>}
      </StyledUserLink>
   )
}

// Nav group list
const NavGroup = styled.ul`
   list-style: none;
   display: flex;
   flex-direction: column;

   & > li {
      display: flex;
   }
`

export {
   AppNavLink,
   UserLink,
   BrandLink,
   NavGroup
}
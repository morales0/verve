import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import SunnyIcon from 'images/sunny.png'
import MoonIcon from 'images/moon.png'
import { useState } from 'react';
import { useTheme } from 'styled-components';

const StyledUserNavbar = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0;
   border-bottom: 1px solid #bebebe;
   height: 40px;

   background-color: ${ props => props.theme.name === 'light' ? '#f1f5f9' : '#333'};
   color: ${ props => props.theme.name === 'light' ? '#333' : '#fafafa'};
`

const Brand = styled(NavLink)`
   padding: 0 1rem;
   font-size: 1.25rem;
   text-decoration: none;
   color: inherit;
`

const User = styled(NavLink)`
   display: flex;
   align-items: center;
   padding: 0 .5rem;
   height: 80%;
   background: lavender;
   border-radius: 20%;
   margin-right: 5px;
   text-decoration: none;
   color: inherit;
`

const UserNavLink = styled(NavLink)`
   display: flex;
   align-items: center;
   padding: 0 .5rem;
   height: 100%;
   text-decoration: none;
   color: inherit;

   &:hover {
      background-color: #dadada;
   }
`

const Nav = styled.nav`
   display: flex;
   align-items: center;
   height: 100%;
`

const StyledThemeButton = styled.button`
   display: flex;
   align-items: center;
   padding: 0 .5rem;
   height: 100%;

   background-color: transparent;
   cursor: pointer;

   border: none;
`

const ThemeButton = ({ setTheme }) => {
   const theme = useTheme()

   const switchTheme = () => {
      setTheme(theme.name === 'light' ? 'dark' : 'light')
   }

   return (
      <StyledThemeButton onClick={switchTheme}>
         {
            theme.name === 'light' ? (
               <img src={SunnyIcon} 
                  alt="theme switch" height='25px' 
               />
            ) : (
               <img src={MoonIcon} 
                  alt="theme switch" height='25px' 
               />
            )
         }
         
      </StyledThemeButton>
   )
}

export {
   StyledUserNavbar,
   Brand,
   User,
   UserNavLink,
   Nav,
   ThemeButton
}
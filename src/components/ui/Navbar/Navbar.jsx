import styled from 'styled-components'

const Navbar = (props) => {
   return ( 
      <StyledNav>
         {props.children}
      </StyledNav>
    );
}

const StyledNav = styled.nav`
   z-index: 99;
   display: flex;
   justify-content: space-between;
   align-items: center;
   // height: 2rem;
   // background: linear-gradient(10deg, #daecf7, #e0e0e0);
   background: #505050;
   color: white;
   box-shadow: 0 0 3px 0px rgba(0,0,0, 0.15);

   // Containers for links
   & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
   }

   // Nav links inside nav
   & a {
      display: flex;
      align-items: center;
      padding: .2rem 10px;
      height: 100%;
      color: inherit;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: .2s;
   }

   & a:hover {
      background-color: #6b80a2;
   }

   // When user is on the page for this link
   .activeNavLink {
      border-bottom: 2px solid #b495ff!important;
   }
`
 
export default Navbar;
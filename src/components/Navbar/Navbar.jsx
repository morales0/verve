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
   align-items: stretch;
   height: 2rem;
   background: linear-gradient(10deg, #daecf7, #e0e0e0);
   box-shadow: 0 0 3px 0px rgba(0,0,0, 0.15);

   & > div {
      display: flex;
      justify-content: center;
      align-items: center;
   }

   & a {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 100%;
      color: inherit;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: .2s;
   }

   & a:hover {
      background-color: #d7e1f1;
   }

   .activeNavLink {
      border-bottom: 1px solid #a9a9a9!important;
   }
`
 
export default Navbar;
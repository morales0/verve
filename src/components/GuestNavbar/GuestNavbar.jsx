import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const GuestNavbar = (props) => {
   return ( 
      <Navbar>
         <div>
            <NavLink exact to="/" activeClassName="activeNavLink">Verve</NavLink>
         </div>
         {/* <NavLink to="/demo" activeClassName="activeNavLink">DEMO</NavLink> */}
         <div>
            <NavLink to="/signIn" activeClassName="activeNavLink">Sign In</NavLink>
            <NavLink to="/signUp" activeClassName="activeNavLink">Sign Up</NavLink>
         </div>
      </Navbar>
    );
}
 
export default GuestNavbar;
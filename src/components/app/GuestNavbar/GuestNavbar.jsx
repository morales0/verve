import { NavLink } from "react-router-dom";
import Navbar from '../../ui/Navbar/Navbar';
import SideNavbar from "components/ui/Navbar/SideNavbar";

const GuestNavbar = (props) => {
   return ( 
      <Navbar>
         <NavLink exact to="/" activeClassName="activeNavLink">Verve</NavLink>
         <div>
            <NavLink to="/signIn" activeClassName="activeNavLink">Sign In</NavLink>
            <NavLink to="/signUp" activeClassName="activeNavLink">Sign Up</NavLink>
         </div>
      </Navbar>
    );
}
 
export default GuestNavbar;
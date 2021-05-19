import { Link, NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './UserNavbar.css'

const UserNavbar = (props) => {
   return ( 
      <Navbar>
         <div>
            <NavLink exact to="/" activeClassName="activeNavLink">Verve</NavLink>
         </div>
         <div className="navLinks">
            <NavLink to="/workout" activeClassName="activeNavLink">Workouts</NavLink>
            <NavLink to="/history" activeClassName="activeNavLink">History</NavLink>
         </div>
         <div>
            <NavLink to="/user" activeClassName="activeNavLink">User</NavLink>
         </div>
      </Navbar>
    );
}
 
export default UserNavbar;
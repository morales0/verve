import { Link, NavLink } from 'react-router-dom'
import './UserNavbar.css'

const UserNavbar = (props) => {
   return ( 
      <nav className="UserNavbar">
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
      </nav>
    );
}
 
export default UserNavbar;
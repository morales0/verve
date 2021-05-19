import { Link, NavLink } from 'react-router-dom'
import './UserNavbar.css'

const UserNavbar = (props) => {
   return ( 
      <nav className="UserNavbar">
         <div>
            Verve
         </div>
         <div className="navLinks">
            <NavLink to="/workout" activeClassName="activeNavLink">Workouts</NavLink>
            <NavLink to="/history" activeClassName="activeNavLink">History</NavLink>
         </div>
         <div>
            Name
         </div>
      </nav>
    );
}
 
export default UserNavbar;
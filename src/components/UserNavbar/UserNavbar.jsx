import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const UserNavbar = (props) => {
   return ( 
      <Navbar>
         <NavLink exact to="/" activeClassName="activeNavLink">Verve</NavLink>
         
         <div>
            <NavLink to="/workout" activeClassName="activeNavLink">Workouts</NavLink>
            <NavLink to="/history" activeClassName="activeNavLink">History</NavLink>
         </div>
         
         <NavLink to="/user" activeClassName="activeNavLink">User</NavLink>
      </Navbar>
    );
}
 
export default UserNavbar;
import { useAuthCheck } from 'context/auth';
import { NavLink } from 'react-router-dom'
import Navbar from '../../ui/Navbar/Navbar'

const UserNavbar = (props) => {
   const authCheck = useAuthCheck()

   return ( 
      <Navbar>
         <NavLink exact to="/" className="navbarBrand" activeClassName="activeNavLink">Verve</NavLink>
         
         <div>
            {
               authCheck.user?.workout &&
               <NavLink to="/workout" activeClassName="activeNavLink">Workouts</NavLink>
            }
            <NavLink to="/history" activeClassName="activeNavLink">History</NavLink>
         </div>
         
         <NavLink to="/user" activeClassName="activeNavLink">
            {authCheck.user?.username}
         </NavLink>
      </Navbar>
    );
}
 
export default UserNavbar;
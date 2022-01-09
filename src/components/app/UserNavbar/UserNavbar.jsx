import UserIcon from 'images/user.png';
import { useUser } from 'reactfire';
import { useWorkingOutCheck } from "services/firebase/index";
import { Brand, Nav, StyledUserNavbar, User, UserNavLink, ThemeButton } from './styles';


/* 
TODO:
* Add dropdown functionality
*/
const UserNavbar = ({ setTheme }) => {
   const user = useUser()
   const isWorkingOut = useWorkingOutCheck()

   return (
      <StyledUserNavbar>
         <Brand exact to="/">Verve</Brand>

         <Nav>
            <UserNavLink exact to="/data">
               Data
            </UserNavLink>
         </Nav>

         <Nav>
            <ThemeButton setTheme={setTheme}/>
            
            <UserNavLink exact to="/workout">
               Workout
            </UserNavLink>
            <User exact to="/user">
               <img src={UserIcon} alt="user icon" height='20' />
            </User>
         </Nav>
      </StyledUserNavbar>
   )
}
 
export default UserNavbar;
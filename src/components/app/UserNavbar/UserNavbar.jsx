import UserIcon from 'images/user.png';
import { useUser } from 'reactfire';
import { useWorkingOutCheck } from "services/firebase/index";
import { Brand, Nav, StyledUserNavbar, User, UserNavLink, ThemeButton } from './styles';
import DumbellIcon from 'images/dumbell.png'


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
            <ThemeButton setTheme={setTheme}/>
            
            <UserNavLink exact to="/workout">
               <img src={DumbellIcon} alt='workout dumbell icon' height={25}/>
            </UserNavLink>
            <User exact to="/user">
               <img src={UserIcon} alt="user icon" height='20' />
            </User>
         </Nav>
      </StyledUserNavbar>
   )
}
 
export default UserNavbar;
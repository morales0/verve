import { ThemeToggle } from "components/ui";
import { useAuth, useUser } from "reactfire";

const User = ({ setCurrTheme }) => {
   const user = useUser()
   const auth = useAuth()

   return (
      <div>
         <div>{user.data.displayName}</div>
         <button onClick={() => auth.signOut()}>
            Sign Out
         </button>
         <ThemeToggle setCurrTheme={setCurrTheme}/>
      </div>
   );
}

export default User;
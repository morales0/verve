import { ThemeToggle } from "components/ui";
import { useAuth, useUser } from "reactfire";

const UserPage = ({ setCurrTheme }) => {
   const user = useUser()
   const auth = useAuth()

   return (
      <div>
         <div>{user.data.displayName}</div>
         <button onClick={() => auth.signOut()}>
            Sign Out
         </button>
      </div>
   );
}

export default UserPage;
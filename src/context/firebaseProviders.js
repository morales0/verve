import { getAuth } from "@firebase/auth"
import { getDatabase } from "@firebase/database"
import { useFirebaseApp, AuthProvider, DatabaseProvider } from "reactfire"

const FirebaseProviders = (props) => {
   const app = useFirebaseApp()
   const auth = getAuth(app)
   const db = getDatabase(app)
   
   return (
      <AuthProvider sdk={auth}>
         <DatabaseProvider sdk={db}>
            {props.children}
         </DatabaseProvider>
      </AuthProvider>
   )
}

export default FirebaseProviders;
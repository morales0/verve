import { createContext, useContext, useEffect, useState } from 'react';
import 'firebase/auth'
import { useAuth, useUser } from 'reactfire'

const AuthContext = createContext()
const AuthProvider = (props) => {
   // Get the auth
   const auth = useAuth()
   const [authLoading, setAuthLoading] = useState(true);
   const [user, setUser] = useState(null);

   // Subscribe to any auth changes
   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         if (user) {
            console.log("User is logged in", user)
         } else {
            console.log("User is not logged in")
         }

         setUser(user)
         setAuthLoading(false)
      })
   }, []);

   useEffect(() => {
   console.log("Full re-render")  
   });

   // Wait for authentication to load app
   if (authLoading) {
      return <h2>Loading...</h2>
   } else {
      return (
         <AuthContext.Provider value={{
            user: user, authenticated: user !== null, authLoading
         }}>
            {props.children}
         </AuthContext.Provider>
      )
   }
}

const useAuthCheck = () => {
   const authCheck = useContext(AuthContext)

   return authCheck
}

export {
   AuthProvider,
   useAuthCheck
}
   
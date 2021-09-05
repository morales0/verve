import AuthApp from "AuthApp";
import React, { useEffect } from "react";
import { useDatabase, useSigninCheck, useUser } from "reactfire";
import styled, { ThemeProvider } from "styled-components";
import UnauthApp from "UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

// TODO: Create theme and global styles

const NewApp = (props) => {
   const { status: authStatus, data: authData } = useSigninCheck()
   const user = useUser()
   const db = useDatabase()

   useEffect(() => {
      console.log(authStatus, authData, user)
   }, [authStatus, authData, user]);

   // Loading screen
   if (authStatus === 'loading') {
      return (
         <div>Loading screen...</div>
      )
   }

   // Return the app!
   return (
      <ThemeProvider theme={{}}>
         {authData.signedIn ? <AuthApp /> : <UnauthApp />}
      </ThemeProvider>
   );
}
 
export default NewApp;
/**
 * TODO:
 * - Integrate lazy load for performance
 */

import AuthApp from "AuthApp";
import React, { useState } from "react";
import { useSigninCheck, useUser } from "reactfire";
import { ThemeProvider } from "styled-components";
import themes from "styles/themes";
import UnauthApp from "UnauthApp";

// Lazy load apps (need suspense)
// const AuthApp = React.lazy(() => import('./AuthApp'))
// const UnauthApp = React.lazy(() => import('./UnauthApp'))

const NewApp = () => {
   const { status: authStatus, data: authData } = useSigninCheck()
   const user = useUser()
   const [theme, setTheme] = useState("dark");

   // Wait for auth status
   if (authStatus === 'loading') {
      return (
         <div>Loading Verve...</div>
      )
   }

   // Wait for user data to load
   if (authData.signedIn && !user.data) {
      return (
         <div>Loading your account...</div>
      )
   }

   // Return the app!
   return (
      <ThemeProvider theme={themes[theme]}>
         { authData.signedIn ? <AuthApp setTheme={setTheme} /> : <UnauthApp /> }
      </ThemeProvider>
   );
}

export default NewApp;